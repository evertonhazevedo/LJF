const Sequelize = require('sequelize');
const db = require('../models/db');
const tabelaServico = require('./servico');
const tabelaCliente = require('./cliente');
const tabelaVeiculo = require('./veiculos');
const sequelize = require('../models/db');

//criando tabela Ordem de Servicos

const tabelaOrdemServico = db.define('ordemServico', {

  cd_ordem_servico: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }

}, { freezeTableName: true });

// relacionamento 1 - vários 'cd_servico':

tabelaOrdemServico.belongsTo(tabelaServico, {
  constraint: true,
  foreignKey: 'cd_servico',
  allowNull: false

});

// Relacionamento 1-1 'cd_servico':

tabelaServico.hasMany(tabelaOrdemServico, {
  foreignKey: 'cd_servico'
});

// relacionamento 1 - vários 'cd_cliente':

tabelaOrdemServico.belongsTo(tabelaCliente, {
  constraint: true,
  foreignKey: 'cd_cliente',
  allowNull: false
});

// Relacionamento 1-1 'cd_cliente':

tabelaCliente.hasMany(tabelaOrdemServico, {
  foreignKey: 'cd_cliente'
});

// relacionamento 1 - vários cd_veiculo:

tabelaOrdemServico.belongsTo(tabelaVeiculo, {
  constraint: true,
  foreignKey: 'cd_veiculo',
  allowNull: false
});

// Relacionamento 1-1 cd_veiculo:

tabelaVeiculo.hasMany(tabelaOrdemServico, {
  foreignKey: 'cd_veiculo'
});

// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaOrdemServico.sync({alter: true});
module.exports = tabelaOrdemServico;