const express = require('express');
const router = express.Router();

/*Importação de middlewars*/
const { eAdmin } = require('../../middlewares/auth');
const { novaPrevisao } = require('../../middlewares/salvarNovaPrevisao');

// importacoes das funcoes executada em cada rota
const cadastrarBaia = require('../controllers/rotaCadastrarBaia');
const cadastrarCliente = require('../controllers/rotaCadastrarCliente');
const cadastrarFuncionario = require('../controllers/rotaCadastrarFuncionario');
const cadastrarVeiculo = require('../controllers/rotaCadastrarVeiculo');
const deletarCliente = require('../controllers/rotaDeletarCliente');
const deletarFuncionario = require('../controllers/rotaDeletarFuncionario');
const deletarVeiculo = require('../controllers/rotaDeletarVeiculo');
const autenticarFuncionario = require('../controllers/rotaAutenticarFuncionario');
const listarServicos = require('../controllers/rotaListarServicos');
const buscarInfoVeiculo = require('../controllers/rotaBuscarInfoVeiculo');
const buscarClienteEVeiculo = require('../controllers/rotaBuscarClienteEVeiculo');
const gerarOS = require('../controllers/rotaGerarOS');
const recuperarBaiasOS = require('../controllers/rotaRecuperarBaiasOS');
const listarFila = require('../controllers/rotaListarFila');
const liberarBaia = require('../controllers/rotaLiberarBaia');
const preencherSelectBaias = require('../controllers/rotaPreencherSelectBaias');
const enviarMensagemAtraso = require('../controllers/rotaEnviarMensagemAtraso');
const salvarNovaPrevisao = require('../controllers/rotaSalvarNovaPrevisao');


//rota que chama a funcao cadastrarBaia
router.post('/cadastrar-baia', cadastrarBaia);

//rota que chama a funcao cadastrarCliente
router.post('/cadastrar-cliente', cadastrarCliente);

//rota que chama a funcao cadastrarFuncionario
router.post('/cadastrar-funcionario', cadastrarFuncionario);

//rota que chama a funcao cadastrarVeiculo
router.post('/cadastrar-veiculo', cadastrarVeiculo);

//rota que chama a funcao gerarOS
router.post('/gerar-os', gerarOS);

//rota que chama a funcao enviarMensagemAtraso
router.post('/enviar-mensagem-atraso', novaPrevisao, enviarMensagemAtraso);

//rota que chama a funcao deletarCliente
router.delete('/deletar-cliente', deletarCliente);

//rota que chama a funcao checkoutBaia
router.put('/liberar-baia', liberarBaia);

//rota que chama a funcao salvarNovaPrevisao
router.put('/salvar-nova-previsao', salvarNovaPrevisao);

//rota que chama a funcao deletarFuncionario
router.delete('/deletar-funcionario', deletarFuncionario);

//rota que chama a funcao deletarVeiculo
router.delete('/deletar-veiculo', deletarVeiculo);

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

//rota que chama a funcao recuperarBaiasOS
router.get('/recuperar-baias-os', recuperarBaiasOS);

//rota que chama a funcao preencherSelectBaias
router.get('/preencher-select-baias', preencherSelectBaias);

module.exports = router;