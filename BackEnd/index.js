const db = require('./conf/autenticacao.js');
db.connectToDatabase(); 
const express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let methodOvirride = require('method-override');
const app = express();
const port = 3000;

// Permite que você use verbos HTTP
app.use(methodOvirride('X-HTTP-Method'));
app.use(methodOvirride('X-HTTP-Method-Override'));
app.use(methodOvirride('X-Method-Override'));
app.use(methodOvirride('_method'));
app.use(cors());

app.use((req, resp, next) => {
  resp.header("Acess-Control-Allow-Origin", "*");
  resp.header("Acess-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accep");
  next()
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//ROTEAMENTO RAIZ
app.get('/', async (req, res) => {
  const results =  await db.selectFull();
  console.log(results);
  res.json(results);
});


// ROTEAMENTO PARA BUSCAR PELO ID
app.get('/clientes/:id', async (req, res) => {  
  const id = req.params.id;
  console.log()
  const results = await db.selectById(id);
  console.log(results);
  res.json(results);
});


// ROTEAMENTO PARA INSERIR
app.post('/clientes/', async (req, res) => { 
  const Nome = req.body.Nome;
  const Idade = req.body.Idade;
  const UF = req.body.UF;
  //const { Nome, Idade, UF } = req.body;
  const results = await db.insertCliente(Nome, Idade, UF);
  console.log(results);
  res.json(results);  
}); 

// ROTEAMENTO PARA ATUALIZAR
app.put('/clientes/:id', async (req, res) => {    
  const id = req.params.id;
  const Nome = req.body.Nome;
  const Idade = req.body.Idade;
  const UF = req.body.UF;
  //const { Nome, Idade, UF } = req.body;
  const results = await db.updateCliente( Nome, Idade, UF,id);
  console.log(results);
  res.json(results);  
}); 


//DELETAR PELO ID
app.delete('/clientes/:id', async (req, res) => { 
  const id = req.params.id;
  const results = await db.deleteById(id);
  console.log(results);
  res.json(results);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

