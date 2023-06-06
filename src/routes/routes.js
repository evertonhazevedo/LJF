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
const recuperarBaia = require('../controllers/rotaRecuperarBaia');
const recuperarOS = require('../controllers/rotaRecuperarOS');
const listarFila = require('../controllers/rotaListarFila');
const liberarBaia = require('../controllers/rotaLiberarBaia');
const preencherSelectBaias = require('../controllers/rotaPreencherSelectBaias');

//rota que chama a funcao cadastrarFuncionario
router.post('/cadastrar-funcionario', cadastrarFuncionario);

//rota que chama a funcao gerarOS
router.post('/gerar-os', gerarOS);

//rota que chama a funcao checkoutBaia
router.put('/liberar-baia', liberarBaia);

//rota que chama a funcao deletarFuncionario
router.delete('/deletar-funcionario', deletarFuncionario);

//rota que chama a funcao autenticarFuncionario
router.get('/autenticar-funcionario/:nm_usuario/:senha', autenticarFuncionario);

//rota que chama a funcao listarServicos
router.get('/listar-servicos', listarServicos);

//rota que chama a funcao listarFila
router.get('/listar-fila', listarFila);

//rota que chama a funcao buscarInfoVeiculo
router.get('/buscar-info-veiculo/:placa', buscarInfoVeiculo);

//rota que chama a funcao buscarClienteEVeiculo
router.get('/buscar-cliente-e-veiculo/:cpf', buscarClienteEVeiculo);

//rota que chama a funcao recuperarBaia
router.get('/recuperar-baia', recuperarBaia);

//rota que chama a funcao recuperarOS
router.get('/recuperar-os', recuperarOS);

//rota que chama a funcao preencherSelectBaias
router.get('/preencher-select-baias', preencherSelectBaias);

module.exports = router;