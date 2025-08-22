import React, { useState, useEffect, useContext } from 'react';
import { UsuarioContext } from '../UsuarioContext';
import { enderecoServidor } from '../utils';
import { MdAdd, MdEdit, MdDelete, MdCategory, MdLabel, MdStar, MdShop, MdWallet,  MdCreditCard, MdShoppingCart, MdBarChart, MdCarCrash } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Estilos from '../styles/Estilos';

export default function Categorias() {
    const { dadosUsuario, carregando } = useContext(UsuarioContext);
    const [dadosLista, setDadosLista] = useState([]);

    const navigate = useNavigate();

    const iconesTipoCategoria = {
    "shopping-cart": <MdShoppingCart className='h-6 w-6'/>, 
     'wallet': <MdWallet className='h-6 w-6'/>,          
    'credit-card': <MdCreditCard className='h-6 w-6'/>,      
    'dollar-sign': <MdStar className='h-6 w-6'/>,       
    'money-bill': <MdCategory className='h-6 w-6'/>,    
    'money-bill-wave': <MdShop className='h-6 w-6'/>,   
    'bar-chart': <MdBarChart className='h-6 w-6'/>,         
    'cash': <MdCarCrash className='h-6 w-6'/>,                 
    
    };

    const nomesTipoCategoria = {
        "shopping-cart": "Carrinho de Compras",
        'wallet': 'Carteira',          
        'credit-card': 'Cartão de Crédito',      
        'dollar-sign': 'Dólar',       
        'money-bill': 'Nota de Dinheiro',    
        'money-bill-wave': 'Onda de Dinheiro',   
        'bar-chart': 'Gráfico de Barras',         
        'cash': 'Dinheiro',                 
    };

    const buscarDadosAPI = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/categorias`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${dadosUsuario.token}`
                }
            });
            const dados = await resposta.json();
            setDadosLista(dados);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    };

    useEffect(() => {
        if (!carregando || dadosUsuario) {
            buscarDadosAPI();
        }
    }, [dadosUsuario]);

    const botaoExcluir = async (id) => {
        try {
            if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) 
                return;

            const resposta = await fetch(`${enderecoServidor}/categorias/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${dadosUsuario.token}`
                }
            });

            if (resposta.ok) {
                buscarDadosAPI();
            }
        } catch (error) {
            console.error('Erro ao excluir categoria:', error);
        }
    };

    const exibirItemLista = (item) => (
        <div key={item.id_categoria} className={Estilos.linhaListagem}>
            <div className='p-2 bg-purple-100 text-purple-600 rounded-full'>
                {iconesTipoCategoria[item.tipo_categoria]}
            </div>
            <div className='flex-1 ml-4'>
                <p className='font-bold text-gray-800'>{item.nome}</p>
                <p className='text-sm text-gray-500'>{nomesTipoCategoria[item.tipo_categoria]}</p>
            </div>
            <div className='flex items-center space-x-2'>
                <button
                    className={Estilos.botaoAlterar}
                    onClick={() => navigate('/cadcategorias', { state: { itemAlterar: item } })}
                >
                    <MdEdit className='h-6 w-6' />
                </button>
                <button
                    className={Estilos.botaoExcluir}
                    onClick={() => botaoExcluir(item.id_categoria)}
                >
                    <MdDelete className='h-6 w-6' />
                </button>
            </div>
        </div>
    );

    return (
        <div>
            <div>
                <p className='text-4xl font-bold mb-6 color black-60'>Categorias</p>
            </div>
            <section className='bg-white p-4 rounded-lg shadow-md'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-xl font-bold text-gray-800'>Gerenciar Categorias</h3>
                    <button
                        className={`border p-1 rounded-xl ${Estilos.botaoCadastro}`}
                        onClick={() => navigate('/cadcategorias')}
                    >
                        <MdAdd className='h-8 w-8 border-2 rounded-full' /> Nova Categoria
                    </button>
                </div>
                <section>
                    {dadosLista.map(item => exibirItemLista(item))}
                </section>
            </section>
        </div>
    );
}
