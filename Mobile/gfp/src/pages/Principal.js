import { Text, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function Principal({ navigation }) {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const buscarUsuarioLogado = async () => {
            const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
            if (usuarioLogado) {
                setUsuario(JSON.parse(usuarioLogado));
            } else {
                navigation.navigate('Login');
            }
        };
        buscarUsuarioLogado();
    }, []);

    const botaoSaido = () => {
        AsyncStorage.removeItem('UsuarioLogado');
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.texto}>Usuário: {usuario?.nome}</Text>
                <Button title="Sair" onPress={botaoSaido} />
            </View>

            <Text style={styles.titulo}>Principal</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2d3436', // Fundo preto
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff', // Texto branco para contrastar
    },
    titulo: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff', // Texto branco
    },
});
