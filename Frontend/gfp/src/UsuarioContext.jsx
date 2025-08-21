import { useContext, createContext, useEffect,  useState, use } from 'react';

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
    const [dadosUsuario, setDadosUsuario] = useState(null)
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const dados = localStorage.getItem('UsuarioLogado');
        if (dados) {
            setDadosUsuario(JSON.parse(dados));
        }
        setCarregando(false);
    }, []);

    return (
    <UsuarioContext.Provider value={{ dadosUsuario, setDadosUsuario, carregando,}}>
        {children}
    </UsuarioContext.Provider>
)
}