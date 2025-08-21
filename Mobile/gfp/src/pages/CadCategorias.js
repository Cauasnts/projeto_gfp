import React, { useState, useEffect, useLayoutEffect } from "react"
import { View, Text, TextInput, Switch, TouchableOpacity } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos from '../styles/Estilos';
import { enderecoServidor } from '../utils';


export default function CadContas({ navigation, route }) {
    const [inputNome, setInputNome] = useState('')
    const [inputTipo, setInputTipo] = useState('')
    const [inputSaldo, setInputSaldo] = useState('')
    const [inputCategoriaPadrao, setInputCategoriaPadrao] = useState(false)
    const [usuario, setUsuario] = useState({})

    useEffect(() => {
        buscarUsuarioLogado();
    }, [])

    useEffect(() => {
        if (route.params && route.params.Conta) {
            setInputNome(route.params.Categoria.nome)
            setInputTipo(route.params.Categoria.tipo_Categoria)
            setInputSaldo(route.params.Categoria.saldo.toString())
            setInputCategoriaPadrao(route.params.Categoria.Categoria_padrao)
        }
    }, [route.params])

    const buscarUsuarioLogado = async  () => {
        const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
        if (usuarioLogado) {
            setUsuario(JSON.parse(usuarioLogado));
        } else {
            navigation.navigate('Login');
        }
    }

    const botaoSalvar = async () => {
        try {
            const dados = {
                nome: inputNome,
                tipo_Categoria: inputTipo,
                saldo: inputSaldo,
                Categoria_padrao: inputCategoriaPadrao
            }
    
            let endpoint = `${enderecoServidor}/Categorias`
            let metodo = 'POST'

            if (route.params && route.params.Categoria){
                endpoint = `${enderecoServidor}/Categorias/${route.params.Categoria.id_Categoria}`
                metodo = 'PUT'
            }

            const resposta = await fetch(endpoint, {
                method: metodo,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usuario.token}`
                },
                body: JSON.stringify(dados)
            })
    
            if (resposta.ok) {
                alert('Categoria cadastrada com sucesso!')
                navigation.goBack()
            }
        } catch (error) {
            console.error('Erro ao salvar Categoria:', error)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={botaoSalvar}>
                    <MaterialIcons name="save" size={28} color="#fff"
                        style={{ marginRight: 15 }} />
                </TouchableOpacity>
            )
        })
    }, [navigation, inputNome, inputTipo, inputSaldo, inputCategoriaPadrao])

    return (
        <View style={Estilos.conteudoHeader}>
            <View style={Estilos.conteudoCorpo}>
                <Text>Nome da Categoria:</Text>
                <TextInput placeholder="Digite o nome da Categoria"
                    value={inputNome} onChangeText={setInputNome}
                    style={Estilos.inputCad} />
                <Text>Tipo da Categoria:</Text>
                <TextInput placeholder="Digite o tipo da Categoria"
                    value={inputTipo} onChangeText={setInputTipo}
                    style={Estilos.inputCad} />
                <Text>Saldo:</Text>
                <TextInput placeholder="Digite o saldo"
                    value={inputSaldo} onChangeText={setInputSaldo}
                    style={Estilos.inputCad} keyboardType="numeric" />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Switch value={inputCategoriaPadrao}
                        onValueChange={setInputCategoriaPadrao} />
                    <Text>Categoria Padrão</Text>
                </View>
            </View>
        </View>
    )
}