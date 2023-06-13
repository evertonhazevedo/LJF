const Sequelize = require('sequelize');

const db = require('./db');

const tabelaUsuario = require('../migrations/usuario');
const tabelaCliente = require('../migrations/cliente');
const tabelaVeiculo = require('../migrations/veiculos');
const tabelaServico = require('../migrations/servico');
const tabelaPagamento = require('../migrations/pagamento');
const tabelaMovimentacao = require('../migrations/movimentacao');
const tabelaFila = require('../migrations/fila');
const tabelaBaia = require('../migrations/baia');
const tabelaOrdemServico = require('../migrations/ordemServico');
const tabelaServicoOS = require('../migrations/servicoOS');