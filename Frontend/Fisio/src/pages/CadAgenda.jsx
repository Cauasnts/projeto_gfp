import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UsuarioContext } from '../UsuarioContext';
import { enderecoServidor } from '../utils';
import { MdSave, MdClose } from 'react-icons/md';
import Estilos from '../styles/Estilos';


export default function CadAgenda() {
  const { dadosUsuario } = useContext(UsuarioContext);
  const navigate = useNavigate();
  const location = useLocation();
  const agendaAlterar = location.state?.pacienteAlterar;

  const [nomeUsuario, setNomeUsuario] = useState(agendaAlterar?.nome_usuario || '');
  const [patologia, setPatologia] = useState(agendaAlterar?.patologia || '');
  const [dataNascimento, setDataNascimento] = useState(
    agendaAlterar?.data_de_nascimento
      ? new Date(agendaAlterar.data_de_nascimento).toISOString().substring(0, 10)
      : ''
  );
  const [quantidadeSecao, setQuantidadeSecao] = useState(agendaAlterar?.quantidade_de_secao || '');

  const salvarAgenda = async () => {
    if (!nomeUsuario || !patologia || !dataNascimento || !quantidadeSecao) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const metodo = agendaAlterar ? 'PUT' : 'POST';
    const url = agendaAlterar
      ? `${enderecoServidor}/agendas/${agendaAlterar.id_agenda}`
      : `${enderecoServidor}/agendas`;

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${dadosUsuario.token}`
        },
        body: JSON.stringify({
          nome_usuario: nomeUsuario,
          patologia,
          data_de_nascimento: dataNascimento,
          quantidade_de_secao: quantidadeSecao,
          id_usuario: dadosUsuario.id, 
          id_fisioterapeuta: dadosUsuario.id
        })
      });

      if (resposta.ok) {
        if (!agendaAlterar) {
          setNomeUsuario('');
          setPatologia('');
          setDataNascimento('');
          setQuantidadeSecao('');
        }
        navigate('/agendas');
      } else {
        const erro = await resposta.json();
        alert("Erro: " + erro.message);
      }
    } catch (error) {
      console.error("Erro ao salvar agenda:", error);
    }
  };

  return (
    
    <div className='p-4'>
        <h1> Adicionar Horario</h1> 
          
      <p className='text-3xl font-bold mb-6'>
        {agendaAlterar ? "Editar Agenda" : "Nova Agenda"}
      </p>
      <div className='flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md'>
        <input 
          className={Estilos.input} 
          placeholder='Nome do Paciente' 
          value={nomeUsuario} 
          onChange={e => setNomeUsuario(e.target.value)} 
        />
        <input 
          className={Estilos.input} 
          placeholder='Patologia' 
          value={patologia} 
          onChange={e => setPatologia(e.target.value)} 
        />
        <input 
          type='date'
          className={Estilos.input} 
          value={dataNascimento} 
          onChange={e => setDataNascimento(e.target.value)} 
        />
        <input 
          type='number'
          className={Estilos.input} 
          placeholder='Quantidade de Sessões' 
          value={quantidadeSecao} 
          onChange={e => setQuantidadeSecao(e.target.value)} 
        />
        <div className='flex space-x-2'>
          <button className={Estilos.botaoSalvar} onClick={salvarAgenda}>
            <MdSave className='inline mr-2' /> Salvar
          </button>
          <button className={Estilos.botaoCancelar} onClick={() => navigate('/agendas')}>
            <MdClose className='inline mr-2' /> Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
