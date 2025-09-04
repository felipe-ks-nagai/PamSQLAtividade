"use strict";
const mysql = require('mysql');
let cn;

function handleDisconnect() {
    cn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'nodemysql'
    });

    cn.connect(function (err) {
        if (err) {
            console.log('Erro ao conectar com o banco de dados: ' + err);
            setTimeout(handleDisconnect, 2000); // Tenta reconectar após 2 segundos
        } else {
            console.log('Conectado com sucesso ao banco de dados!');
        }
    });

    cn.on('error', function (err) {
        console.log('DB error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconecta em caso de perda de conexão
        } else {
            throw err;
        }
    });
}

const connectToDatabase = handleDisconnect;

async function selectFull() {
    const query = 'SELECT * FROM Clientes';
    return new Promise((resolve, reject) => {
        cn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Erro ao consultar o banco de dados: ' + err);
                reject(err);
            } else {
                resolve(JSON.parse(JSON.stringify(results)));
            }
        });
    });
}

async function insertCliente(Nome, Idade, UF) {
    const query = 'INSERT INTO Clientes (Nome, Idade, UF) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        cn.query(query, [Nome, Idade, UF], (err, results) => {
            if (err) {
                console.log('Erro ao inserir o registro: ' + err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

async function selectById(id) {
    console.log("ID recebido no selectById:", id);
    const query = 'SELECT * FROM Clientes WHERE id = ?';
    return new Promise((resolve, reject) => {
        cn.query(query, [id], (err, results, fields) => {
            if (err) {
                console.log('Erro ao consultar o banco de dados: ' + err);
                reject(err);
            } else {
                resolve(JSON.parse(JSON.stringify(results)));
            }
        });
    });
}

async function deleteById(id) {
    const query = 'DELETE FROM Clientes WHERE id = ?';
    return new Promise((resolve, reject) => {
        cn.query(query, [id], (err, results, fields) => {
            if (err) {
                console.log('Erro ao deletar o registro: ' + err);
                reject(err);
            } else {
                resolve(results.affectedRows > 0);
            }
        });
    });
}

async function updateCliente(Nome, Idade, UF, ID) {
    const query = 'UPDATE Clientes SET Nome = ?, Idade = ?, UF = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        cn.query(query, [Nome, Idade, UF, ID], (err, results) => {
            if (err) {
                console.log('Erro ao atualizar o registro: ' + err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { connectToDatabase, selectFull, selectById, deleteById, insertCliente, updateCliente }