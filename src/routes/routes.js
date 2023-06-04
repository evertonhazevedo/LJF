const express = require('express');
const router = express.Router();

/*Importação de middlewars*/
const { eAdmin } = require('../../middlewares/auth');

// importacoes das funcoes executada em cada rota
const cadastrarFuncionario = require('../controllers/rotaCadastrarFuncionario');
const deletarFuncionario = require('../controllers/rotaDeletarFuncionario');
const autenticarFuncionario = require('../controllers/rotaAutenticarFuncionario');
const listarServicos = require('../controllers/rotaListarServicos');
const buscarInfoVeiculo = require('../controllers/rotaBuscarInfoVeiculo');
const buscarClienteEVeiculo = require('../controllers/rotaBuscarClienteEVeiculo');
const gerarOS = require('../controllers/rotaGerarOS');

//rota que chama a funcao cadastrarFuncionario
router.post('/cadastrar-funcionario', cadastrarFuncionario);

//rota que chama a funcao gerarOS
router.post('/gerar-os', gerarOS);

//rota que chama a funcao deletarFuncionario
router.delete('/deletar-funcionario', deletarFuncionario);

//rota que chama a funcao autenticarFuncionario
router.get('/autenticar-funcionario/:nm_usuario/:senha', autenticarFuncionario);

//rota que chama a funcao listarServicos
router.get('/listar-servicos', listarServicos);

//rota que chama a funcao buscarInfoVeiculo
router.get('/buscar-info-veiculo/:placa', buscarInfoVeiculo);

//rota que chama a funcao buscarClienteEVeiculo
router.get('/buscar-cliente-e-veiculo/:cpf', buscarClienteEVeiculo);

module.exports = router;