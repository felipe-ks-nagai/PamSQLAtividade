import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from "@react-navigation/native"; 
import { IconButton } from 'react-native-paper';

import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';

import config from './getIp.json';

export default function App() {
  const [clientes, setClientes] = useState([]);

  const getClientes = async () => {
    try {
      const res = await fetch(`${config.IP_LOCAL}:3000/`);
      const data = await res.json();
      setClientes(data);
      console.log('Clientes buscados:', data);
      console.log('Clientes state atualizado:', clientes);  
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };


  const updateCliente = async () => {
    try {
      const res = await fetch(`http://192.168.15.7:3000/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Nome: nome, Idade: idade, UF: uf }),
      });
      const data = await res.json();
      console.log('Cliente atualizado:', data);
      getClientes();
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  const deleteCliente = async () => {
    try {
      const res = await fetch(`http://192.168.15.7:3000/clientes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      console.log('Cliente deletado:', data);
      getClientes();
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getClientes();
    }, [])
  );


    const headerRows = () => (
      <View style={styles.row}>
        <Text style={[styles.cell, styles.headerText]}>ID</Text>
        <Text style={[styles.cell, styles.headerText]}>Nome</Text>
        <Text style={[styles.cell, styles.headerText]}>Idade</Text>
        <Text style={[styles.cell, styles.headerText]}>UF</Text>
        <Text style={[styles.cell, styles.headerText]}>Ações</Text>
      </View>
    );

    const itemRows = ({ item }) => (
      <View style={styles.row}>
        <Text style={styles.cell}>{item.ID}</Text>
        <Text style={styles.cell}>{item.Nome}</Text>
        <Text style={styles.cell}>{item.Idade}</Text>
        <Text style={styles.cell}>{item.UF}</Text>
        <View style={styles.acoes}>  
          <IconButton 
            onPress={() => router.push(`/editCliente/?id=${item.ID}`)}
            size={20}
            icon="pencil" 
            iconColor="#b6c90bff"
          />
          <IconButton 
            onPress={deleteCliente} 
            size={20}
            icon="delete-forever" 
            iconColor="#ff0000ff"
          />
        </View>
      </View>
    );
        
        

  return (
    <View style={styles.container}>
      <Text style={styles.titulotext}>Clientes</Text>
      {headerRows()}
      <FlatList
        data={clientes}
        keyExtractor={item => item.ID.toString()}
        renderItem={itemRows} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    padding: 16,
  },
  whiteText: {
    color: 'white',
  },
  titulotext: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#393E46',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#13d0e9ff',
  },
  acoes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});