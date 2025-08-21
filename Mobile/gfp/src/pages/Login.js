import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Image,
    Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { enderecoServidor } from '../utils';
import Estilos_Login from '../styles/Estilos_Login';
import Estilos, {
    corPrincipal,
    corSecundaria,
    corTextos,
    corTextos2
} from '../styles/Estilos';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [lembrar, setLembrar] = useState(false);

    useEffect(() => {
        const buscarUsuarioLogado = async () => {
            const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
            if (usuarioLogado) {
                const usuario = JSON.parse(usuarioLogado);
                if (usuario.lembrar === true) {
                    navigation.navigate('MenuDrawer');
                }
            }
        };
        buscarUsuarioLogado();
    }, []);

    const botaoLogin = async () => {
        try {
            if (!email || !senha) throw new Error('Preencha todos os campos');

            const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                await AsyncStorage.setItem('UsuarioLogado', JSON.stringify({ ...dados, lembrar }));
                navigation.navigate('MenuDrawer');
            } else {
                throw new Error(dados.message || 'Erro ao fazer login');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={Estilos_Login.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />

            <LinearGradient colors={['#2c3e50', corPrincipal]} style={Estilos_Login.gradientBackground}>

                {/* Cabeçalho */}
                <View style={Estilos_Login.header}>
                    <View style={Estilos_Login.logoContainer}>
                        <Image source={require('../assets/logoPrincipal.jpg')} style={{ width: 50, height: 50 }} />
                        <View>
                            <Text style={Estilos_Login.logoText}>GFP</Text>
                            <Text style={Estilos_Login.headerSubTitle}>Gestor Financeiro Pessoal</Text>
                        </View>
                    </View>
                </View>

                {/* Card de login */}
                <View style={Estilos_Login.loginCard}>
                    <Text style={Estilos_Login.loginTitle}>Acesse sua conta</Text>

                    {/* Input Email */}
                    <View style={Estilos.inputContainer}>
                        <Ionicons
                            name="mail-outline"
                            size={20}
                            color={'email' ? corPrincipal : corTextos2}
                            style={Estilos.inputIcon}
                        />
                        <TextInput
                            style={[
                                Estilos.input,
                                'email' && Estilos.inputActive,
                            ]}
                            placeholder="Email"
                            placeholderTextColor={corTextos2}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* Input Senha */}
                    <View style={Estilos.inputContainer}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color={'password' ? corPrincipal : corTextos2}
                            style={Estilos.inputIcon}
                        />
                        <TextInput
                            style={[
                                Estilos.input,
                                'password' && Estilos.inputActive
                            ]}
                            placeholder="Senha"
                            placeholderTextColor={corTextos2}
                            secureTextEntry={!showPassword}
                            value={senha}
                            onChangeText={setSenha}
                        />
                        <TouchableOpacity
                            style={Estilos.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={20}
                                color={corTextos2}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Switch lembrar */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
                        <Switch value={lembrar} onValueChange={setLembrar} />
                        <Text style={Estilos_Login.textoLembrar}>Lembrar-me</Text>
                    </View>

                    {/* Esqueceu senha */}
                    <View style={Estilos_Login.forgotPasswordContainer}>
                        <TouchableOpacity>
                            <Text style={Estilos_Login.forgotPasswordText}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Botão Entrar */}
                    <TouchableOpacity style={Estilos.botao} activeOpacity={0.8} onPress={botaoLogin}>
                        <LinearGradient
                            colors={[corPrincipal, corSecundaria]}
                            style={Estilos.degradeBotao}
                        >
                            <Text style={Estilos.botaoTexto}>Entrar</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Link Cadastro */}
                    <View style={Estilos_Login.signUpContainer}>
                        <Text style={Estilos_Login.signUpText}>Não tem uma conta?</Text>
                        <TouchableOpacity>
                            <Text style={Estilos_Login.signUpLink}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recursos */}
                <View style={Estilos_Login.featuresContainer}>
                    <View style={Estilos_Login.featureItem}>
                        <Ionicons name="stats-chart-outline" size={20} color={corTextos} />
                        <Text style={Estilos_Login.featureText}>Acompanhe seus gastos com gráficos</Text>
                    </View>
                    <View style={Estilos_Login.featureItem}>
                        <Ionicons name="notifications-outline" size={20} color={corTextos} />
                        <Text style={Estilos_Login.featureText}>Receba alertas financeiros importantes</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default Login;
