const express = require('express');
const router = express.Router();

/*Importação de middlewars*/
const { eAdmin } = require('../../middlewares/auth');

// importacoes das funcoes executada em cada rota
const cadastrarFuncionario = require('../controllers/rotaCadastrarFuncionario');
const deletarFuncionario = require('../controllers/rotaDeletarFuncionario');
const autenticarFuncionario = require('../controllers/rotaAutenticarFuncionario');
const listarServicos = require('../controllers/rotaListarServicos');

//rota que chama a funcao cadastrarFuncionario
router.post('/cadastrar-funcionario', cadastrarFuncionario);

//rota que chama a funcao deletarFuncionario
router.delete('/deletar-funcionario', deletarFuncionario);

//rota que chama a funcao autenticarFuncionario
router.get('/autenticar-funcionario/:nm_usuario/:senha', autenticarFuncionario);

//rota que chama a funcao listarServicos
router.get('/listar-servicos', listarServicos);


module.exports = router;