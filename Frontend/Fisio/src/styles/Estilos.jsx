export const corPrincipal = '#3498db';
export const corSecundaria = '#2980b9';
export const corTextos = '#f2f2f2';
export const corTextos2 = '#999';
export const corPreto = '#222';
export const corFundo = '#0d0d0d';
export const corFundo2 = '#262626';
export const corBorda = '#262626';


const Estilos = {
    conteudo : {
        flex : 1,
        width : '100%',
        backgroundColor: corFundo
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#f4f6f8',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 45,
        fontSize: 16,
        color: corPreto,
        borderWidth: 1,
        borderColor: corBorda,
    },
    inputActive: {
        borderColor: corPrincipal,
        backgroundColor: 'rgba(52, 152, 219, 0.05)',
    },
    inputIcon: {
        position: 'absolute',
        left: 15,
        top: 15,
        zIndex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 15,
        zIndex: 1,
    },
    botao: {
        width: '100%',
        height: 55,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 24,
    },
    degradeBotao: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoTexto: {
        color: corTextos,
        fontSize: 16,
        fontWeight: 'bold',
    },
    botaoCadastro: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded",
    linhaListagem: 'flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow my-2',
    botaoAlterar: 'flex items-center p-1 text-cyan-400 bg-cyan-100 hover:bg-cyan-200 rounded-md transition-colors',
    botaoExcluir: 'flex items-center p-1 text-red-700 bg-red-100 hover:bg-cyan-200 rounded-md transition-colors',
    labelCadastro: 'block mb-1 font-medium text-gray-700',
    inputCadastro: 'w-full p-2 text-black border border-gray-300 px-4 py-2 shadow-lg rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500',
    botaoOutline: "flex items-center gap-2 px-4 py-2 border-gray-400 text-black-700 rounded-lg hover:bg-gray-200",
    botao: "flex items-center gap-2 px-4 py-2  text-white-700  bg-cyan-400 rounded-lg hover:bg-cyan-700"
}

export default Estilos;