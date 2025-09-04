import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import {useRouter} from 'expo-router';

import config from './getIp.json';

export default function App({navigation}) {
    const router = useRouter();
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [uf, setUf] = useState('');

    const addCliente = async () => {
        try {
        const res = await fetch(`${config.IP_LOCAL}:3000/clientes`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Nome: nome, Idade: idade, UF: uf }),
        });
        const data = await res.json();
        console.log('Cliente adicionado:', data);
        router.push("/");
        } catch (error) {
        console.error('Erro ao adicionar cliente:', error);
        }
    };


return (
    <View style={styles.container}>
        <Text style={styles.titulotext}>Adicionar Cliente</Text>
        <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        />
        <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        />
        <TextInput
        style={styles.input}
        placeholder="UF"
        value={uf}
        onChangeText={setUf}
        />
        <TouchableOpacity onPress={addCliente} style={styles.button}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Adicionar Cliente</Text>
        </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#222831',

    },
    titulotext: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#daf1e6ff',
        borderColor: '#daf1e6ff',
        padding: 10,
        borderBottomWidth: 3,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#3ab879ff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
    },
});