import { StyleSheet, Dimensions } from 'react-native';
import { corPrincipal, corTextos, corTextos2, corFundo } from './Estilos';

const { width, height } = Dimensions.get('window');

const Estilos_Login = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corFundo,
  },

  gradientBackground: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  header: {
    marginTop: height * 0.05,
    marginBottom: 30,
    alignItems: 'center',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  logoText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },

  headerSubTitle: {
    fontSize: 14,
    color: '#ddd',
  },

  loginCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  loginTitle: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },

  textoLembrar: {
    color: '#ccc',
    marginLeft: 10,
  },

  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },

  forgotPasswordText: {
    color: '#aaa',
    fontSize: 14,
  },

  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },

  signUpText: {
    color: '#ccc',
    fontSize: 14,
  },

  signUpLink: {
    color: corPrincipal,
    fontWeight: 'bold',
  },

  featuresContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },

  featureText: {
    color: corTextos,
    fontSize: 13,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default Estilos_Login;
