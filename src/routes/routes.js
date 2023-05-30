const express = require('express');
const router = express.Router();

// importacoes das funcoes executada em cada rota
const cadastrarFuncionario = require('../controllers/rotaCadastrarFuncionario');
const deletarFuncionario = require('../controllers/rotaDeletarFuncionario');

//rota que chama a funcao cadastrarFuncionario
router.post('/cadastrar-funcionario', cadastrarFuncionario);

//rota que chama a funcao deletarFuncionario
router.delete('/deletar-funcionario', deletarFuncionario);


module.exports = router;