import React, { useState, useEffect, useContext } from 'react';
import { UsuarioContext } from '../UsuarioContext';
import { enderecoServidor } from '../utils';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Estilos from '../styles/Estilos';

export default function Fisioterapeutas() {
    const { dadosUsuario, carregando } = useContext(UsuarioContext);
    const [listaFisioterapeutas, setListaFisioterapeutas] = useState([]);
    const navigate = useNavigate();

    const buscarFisioterapeutas = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/Fisioterapeutas`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${dadosUsuario.token}`
                }
            });
            const dados = await resposta.json();
            setListaFisioterapeutas(dados);
        } catch (error) {
            console.error('Erro ao buscar fisioterapeutas:', error);
        }
    };

    useEffect(() => {
        if (!carregando && dadosUsuario) {
            buscarFisioterapeutas();
        }
    }, [dadosUsuario]);

    const excluirFisioterapeuta = async (id) => {
        try {
            if (!window.confirm("Tem certeza que deseja excluir este fisioterapeuta?")) 
                return;

            const resposta = await fetch(`${enderecoServidor}/Fisioterapeutas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${dadosUsuario.token}`
                }
            });

            if (resposta.ok) {
                buscarFisioterapeutas();
            }
        } catch (error) {
            console.error('Erro ao excluir fisioterapeuta:', error);
        }
    };

    const exibirFisioterapeuta = (item) => (
        <div key={item.id_fisioterapeuta} className={Estilos.linhaListagem}>
            <div className='flex-1 ml-4'>
                <p className='font-bold text-gray-800'>{item.nome}</p>
                <p className='text-sm text-gray-500'>{item.especialidade}</p>
            </div>
            <div className='flex items-center space-x-2'>
                <button
                    className={Estilos.botaoAlterar}
                    onClick={() => navigate('/CadFisioterapeutas', { state: { itemAlterar: item } })}
                >
                    <MdEdit className='h-6 w-6' />
                </button>
                <button
                    className={Estilos.botaoExcluir}
                    onClick={() => excluirFisioterapeuta(item.id_fisioterapeuta)}
                >
                    <MdDelete className='h-6 w-6' />
                </button>
            </div>
        </div>
    );

    return (
        <div>
            <div>
                <p className='text-4xl font-bold mb-6 color black-60'>Fisioterapeutas</p>
            </div>
            <section className='bg-white p-4 rounded-lg shadow-md'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-xl font-bold text-gray-800'>Gerenciar Fisioterapeutas</h3>
                    <button
                        className={`border p-1 rounded-xl ${Estilos.botaoCadastro}`}
                       onClick={() => navigate('/cadFisioterapeutas')}
                    >
                        <MdAdd className='h-8 w-8 border-2 rounded-full' /> Novo Fisioterapeuta
                    </button>
                </div>
                <section>
                    {listaFisioterapeutas.map(item => exibirFisioterapeuta(item))}
                </section>
            </section>
        </div>
    );
}
