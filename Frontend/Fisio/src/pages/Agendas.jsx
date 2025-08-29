import React, { useState, useEffect, useContext } from 'react';
import { UsuarioContext } from '../UsuarioContext';
import { enderecoServidor } from '../utils';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Estilos from '../styles/Estilos';

export default function Agendas() {
  const { dadosUsuario, carregando } = useContext(UsuarioContext);
  const [listaPacientes, setListaPacientes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const buscarPacientesAPI = async (page = 1) => {
    try {
      const resposta = await fetch(`${enderecoServidor}/agendas?page=${page}&limit=20`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${dadosUsuario.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!resposta.ok) {
        const erroTexto = await resposta.text();
        console.error("⚠️ Erro na API:", resposta.status, erroTexto);
        throw new Error(`Erro ${resposta.status}: ${erroTexto}`);
      }

      const dados = await resposta.json();
      console.log("✅ Pacientes carregados:", dados);
      setListaPacientes(dados.agendas);
      setPagina(dados.page);
      setTotal(dados.total);
    } catch (error) {
      console.error('❌ Erro ao buscar pacientes:', error);
    }
  };

  useEffect(() => {
    if (!carregando && dadosUsuario?.token) {
      buscarPacientesAPI();
    }
  }, [carregando, dadosUsuario]);

  const excluirPaciente = async (id) => {
    try {
      if (!window.confirm("Tem certeza que deseja excluir este paciente da agenda?")) return;
      const resposta = await fetch(`${enderecoServidor}/agendas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${dadosUsuario.token}`
        }
      });
      if (resposta.ok) {
        buscarPacientesAPI(pagina);
      }
    } catch (error) {
      console.error('Erro ao excluir paciente:', error);
    }
  };

  const exibirPaciente = (paciente) => (
    <div key={paciente.id_agenda} className={Estilos.linhaListagem}>
      <div className='flex-1 ml-4'>
        <p className='font-bold text-gray-800'>{paciente.nome_usuario}</p>
        <p className='text-sm text-gray-500'>Patologia: {paciente.patologia}</p>
        <p className='text-sm text-gray-500'>Data de Nascimento: {new Date(paciente.data_de_nascimento).toLocaleDateString()}</p>
        <p className='text-sm text-gray-500'>Qtd. Sessões: {paciente.quantidade_de_secao}</p>
      </div>
      <div className='flex items-center space-x-2'>
        <button 
          className={Estilos.botaoAlterar} 
          onClick={() => navigate(`/CadAgendas`, { state: { pacienteAlterar: paciente } })}
        >
          <MdEdit className='h-6 w-6' />
        </button>
        <button 
          className={Estilos.botaoExcluir} 
          onClick={() => excluirPaciente(paciente.id_agenda)}
        >
          <MdDelete className='h-6 w-6' />
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <p className='text-4xl font-bold mb-6 text-gray-800'>Agenda de Pacientes</p>
      </div>
      <section className='bg-white p-4 rounded-lg shadow-md'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-bold text-gray-800'>Gerenciar Agenda</h3>
          <button
            className={`border p-1 rounded-xl ${Estilos.botaoCadastro}`}
            onClick={() => navigate('/CadAgendas')}
          >
            <MdAdd className='h-8 w-8 border-2 rounded-full' /> Novo Paciente
          </button>
        </div>
        <section>
          {listaPacientes.length > 0 ? (
            listaPacientes.map(p => exibirPaciente(p))
          ) : (
            <p className='text-gray-500'>Nenhum paciente encontrado.</p>
          )}
        </section>
      </section>
    </div>
  );
}
