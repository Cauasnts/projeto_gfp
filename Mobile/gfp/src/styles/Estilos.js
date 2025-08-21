import { StyleSheet, Dimensions } from 'react-native';

export const corPrincipal = '#00B894';
export const corSecundaria = '#0984e3';
export const corFundo = '#1e272e';
export const corTextos = '#dfe6e9';
export const corTextos2 = '#b2bec3';

const { width } = Dimensions.get('window');

const Estilos = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d3436',
    borderRadius: 12,
    marginVertical: 10,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
    paddingLeft: 8,
  },

  inputActive: {
    borderBottomWidth: 2,
    borderBottomColor: corPrincipal,
  },

  inputIcon: {
    marginRight: 8,
    color: '#ccc',
  },

  eyeIcon: {
    padding: 8,
  },

  botao: {
    marginTop: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },

  degradeBotao: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  conteudoHeader: {
    flex: 1,
    backgroundColor: corPrincipal,
  },

  conteudoCorpo: {
    flex: 1,
    backgroundColor: corFundo,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding : 20
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
    color: corTextos,
    textAlign: 'center',
  },
  itemLista: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d3436',
    borderRadius: 12,
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  imagemLista: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  nomeLista: {
    fontSize: 16,
    fontWeight: 'bold',
    color: corPrincipal,
  },
  containerFundo: {
    backgroundColor: corFundo,
  },
  inputCad: {
    backgroundColor: '#2d3436',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    color: '#fff',
    fontSize: 16,
  },
     conteudoHeader: {
        flex: 1,
        backgroundColor: corFundo,
        padding: 16,
    },
    itemLista: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#16213e',
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    itemListaTexto: {
        flex: 1,
        marginRight: 10,
    },
    itemListaTextoNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: corTextos,
    },
    itemListaTextoTipo: {
        fontSize: 14,
        color: '#aaa',
        marginTop: 4,
    },
    itemListaBotoes: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalFundo: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'flex-end',
    },
    modalConteudo: {
        backgroundColor: '#1e272e',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 18,
    },
    modalTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: corTextos,
        marginBottom: 16,
    },
    inputModal: {
      backgroundColor: '#2d3436',
      flex: 1,
      padding: 12,
      borderRadius: 8,
    },
    modalBotoes: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
corBotao: {
        with: 40,
        height: 40,
        borderRadius: 20,
        margin: 8,
        borderWidth: 2,
        borderColor: '#fff',
    },
    iconeBotao: {
        with: 40,
        height: 40,
        padding: 8,
        backgroundColor: '#333',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    seletorContainer: {
        backgroundColor: '#1e1e1e',
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    listaModal: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8
    }


}

);

export default Estilos;
