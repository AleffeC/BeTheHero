const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());// padroniza as mensagens de erro da validação(joi) e monstra o erro de uma forma masi detalhada ao usuario

module.exports = app;
//GET = buscar informaçoes do  backend
//POST = Criar uma informação no backend
//PUT = alterar uma informação no backend
//DELETE = deletar uma informação no backend

//tipos de parametro:
/*
 Query params: parametros nomeados enviados na rota apos "?" (filtros, paginação etc..)
 Route params: Parametros utilizados para identificar um unico recurso
 Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

/*
Banco usado: SQLite
*Driver: SELECT * FROM users
*Query Builder: table('users).select('*').where()

Ferramenta de teste usada:
Jest e Supertest 
*/

