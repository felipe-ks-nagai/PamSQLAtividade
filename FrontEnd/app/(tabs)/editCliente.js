import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native"; 
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import {useRouter} from 'expo-router';
import { Button } from 'react-native-paper';

import config from './getIp.json';

export default function App() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [clientes, setClientes] = useState({});
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [uf, setUf] = useState('');

  const getClientesbyId = async () => {
    try {
      const res = await fetch(`${config.IP_LOCAL}:3000/clientes/${id}`);
      const data = await res.json();
      setClientes(data[0]);
      console.log('Clientes buscados:', data);
      setNome(data[0].Nome);
      setIdade(data[0].Idade.toString());
      setUf(data[0].UF);
      console.log('Clientes state atualizado:', clientes);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const updateCliente = async () => {
    try {
      const res = await fetch(`${config.IP_LOCAL}:3000/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Nome: nome, Idade: idade, UF: uf }),
      });
      const data = await res.json();
      console.log('Cliente atualizado:', data);
      router.push("/");
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  const deleteCliente = async () => {
    try {
      const res = await fetch(`${config.IP_LOCAL}:3000/clientes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      console.log('Cliente deletado:', data);
      router.push("/");
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (id) getClientesbyId();
    }, [id])
  );

  useEffect(() => {
    console.log('Clientes state atualizado:', clientes);
  }, [clientes]);

  return (
    <View style={styles.container}>
      <View style={{  borderWidth: 2, borderColor: '#00ADB5', padding: 20, borderRadius: 10   }}>
        <Text style={[styles.whiteText, {marginBottom: 10}]}>View Cliente {id}</Text>
        <TextInput 
          style={[styles.textInput, styles.whiteText]} 
          value={nome}
          onChangeText={setNome}
        />
        <TextInput 
          style={[styles.textInput, styles.whiteText]} 
          value={idade}
          onChangeText={setIdade}
        />
        <TextInput 
          style={[styles.textInput, styles.whiteText]} 
          value={uf}
          onChangeText={setUf}
        />
        <View style={styles.botoes}>
          <Button mode="contained" onPress={updateCliente} buttonColor='#00ADB5' textColor='#fff' style={{ borderColor: '#00ADB5' }}>
              Confirmar edição
            </Button>
            <Button mode="outlined" onPress={() => router.push("/")} textColor='#00ADB5' style={{ borderColor: '#00ADB5' }}>
              Voltar
            </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#222831',
  justifyContent: 'center',
  alignItems: 'center',     
},
  whiteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  }

});