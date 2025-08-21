import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, TextInput, Switch, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from '../styles/Estilos';
import { enderecoServidor } from '../utils';

export default function CadContas({ navigation, route }) {
    const [inputNome, setInputNome] = useState('');
    const [inputTipo, setInputTipo] = useState('');
    const [inputSaldo, setInputSaldo] = useState('');
    const [inputContaPadrao, setInputContaPadrao] = useState(false);
    const [usuario, setUsuario] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        buscarUsuarioLogado();
    }, []);

    useEffect(() => {
        if (route.params && route.params.Conta) {
            const { nome, tipo_conta, saldo, conta_padrao } = route.params.Conta;
            setInputNome(nome);
            setInputTipo(tipo_conta);
            setInputSaldo(saldo.toString());
            setInputContaPadrao(conta_padrao);
        }
    }, [route.params]);

    const buscarUsuarioLogado = async () => {
        try {
            const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
            if (usuarioLogado) {
                setUsuario(JSON.parse(usuarioLogado));
            } else {
                Alert.alert('Sessão expirada', 'Por favor, faça login novamente.');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            Alert.alert('Erro', 'Não foi possível verificar o usuário.');
        }
    };

    const botaoSalvar = async () => {
        if (!inputNome || !inputTipo || !inputSaldo) {
            Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            const dados = {
                nome: inputNome,
                tipo_conta: inputTipo,
                saldo: parseFloat(inputSaldo),
                conta_padrao: inputContaPadrao
            };

            let endpoint = `${enderecoServidor}/contas`;
            let metodo = 'POST';

            if (route.params && route.params.Conta) {
                endpoint = `${enderecoServidor}/contas/${route.params.Conta.id_conta}`;
                metodo = 'PUT';
            }

            const resposta = await fetch(endpoint, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usuario.token}`
                },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                Alert.alert('Sucesso', 'Conta salva com sucesso!');
                navigation.goBack();
            } else {
                Alert.alert('Erro', 'Não foi possível salvar a conta.');
            }
        } catch (error) {
            console.error('Erro ao salvar conta:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar a conta.');
        } finally {
            setLoading(false);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={botaoSalvar} disabled={loading}>
                    <MaterialIcons name="save" size={28} color="#fff" style={{ marginRight: 15 }} />
                </TouchableOpacity>
            )
        });
    }, [navigation, inputNome, inputTipo, inputSaldo, inputContaPadrao, loading]);

    return (
        <View style={Estilos.conteudoHeader}>
            <View style={Estilos.conteudoCorpo}>
                <Text>Nome da Conta:</Text>
                <TextInput
                    placeholder="Ex: Conta Corrente"
                    value={inputNome}
                    onChangeText={setInputNome}
                    style={Estilos.inputCad}
                />
                <Text>Tipo da Conta:</Text>
                <TextInput
                    placeholder="Ex: Corrente, Poupança..."
                    value={inputTipo}
                    onChangeText={setInputTipo}
                    style={Estilos.inputCad}
                />
                <Text>Saldo:</Text>
                <TextInput
                    placeholder="Ex: 1500.50"
                    value={inputSaldo}
                    onChangeText={setInputSaldo}
                    style={Estilos.inputCad}
                    keyboardType="numeric"
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <Switch
                        value={inputContaPadrao}
                        onValueChange={setInputContaPadrao}
                    />
                    <Text style={{ marginLeft: 10 }}>Conta Padrão</Text>
                </View>

                {loading && (
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
                )}
            </View>
        </View>
    );
}
