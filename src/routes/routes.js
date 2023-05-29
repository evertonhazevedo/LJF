const express = require('express');
const router = express.Router();

// importacoes das funcoes executada em cada rota
const cadastrarFuncionario = require('../controllers/rotaCadastrarFuncionario');


//rota que chama a funcao cadastrarFuncionario

router.post('/cadastrar-funcionario', cadastrarFuncionario);


module.exports = router;