const Sequelize = require('sequelize');
const db = require('../models/db');
const tabelaServico = require('./servico');
const tabelaCliente = require('./cliente');
const tabelaVeiculo = require('./veiculos');

//criando tabela Ordem de Servicos

const tabelaOrdemServico = db.define('ordemServico', {

  cd_ordem_servico: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

}, { freezeTableName: true });

// Relacionamento 1-1 'cd_servico':

tabelaServico.belongsTo(tabelaOrdemServico, {
  constraint: true,
  foreignKey: 'cd_servico',
  allowNull: false

});

// relacionamento 1 - vários 'cd_servico':

tabelaOrdemServico.hasMany(tabelaServico, {
  foreignKey: 'cd_servico'
});

// Relacionamento 1-1 'cd_cliente':

tabelaCliente.belongsTo(tabelaOrdemServico, {
  constraint: true,
  foreignKey: 'cd_cliente',
  allowNull: false

});

// relacionamento 1 - vários 'cd_cliente':

tabelaOrdemServico.hasMany(tabelaCliente, {
  foreignKey: 'cd_cliente'
});

// Relacionamento 1-1 cd_veiculo:

tabelaVeiculo.belongsTo(tabelaOrdemServico, {
  constraint: true,
  foreignKey: 'cd_veiculo',
  allowNull: false

});

// relacionamento 1 - vários cd_veiculo:

tabelaOrdemServico.hasMany(tabelaVeiculo, {
  foreignKey: 'cd_veiculo'
});

// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaOrdemServico.sync();

module.exports = tabelaOrdemServico;