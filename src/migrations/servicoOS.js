const Sequelize = require('sequelize');
const db = require('../models/db');
const tabelaOrdemServico = require('./ordemServico');
const tabelaServico = require('./servico');

//criando tabela Ordem de Servicos

const tabelaServicoOS = db.define('servicoOS', {

  cd_servico_os: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }

}, { freezeTableName: true });


tabelaServicoOS.belongsTo(tabelaOrdemServico, {
  constraint: true,
  foreignKey: 'cd_ordem_servico',
  allowNull: false
});

// relacionamento 1 - vários 'cd_cliente':

tabelaOrdemServico.hasMany(tabelaServicoOS, {
  foreignKey: 'cd_ordem_servico'
});

tabelaServicoOS.belongsTo(tabelaServico, {
  constraint: true,
  foreignKey: 'cd_servico',
  allowNull: false
});

// relacionamento 1 - vários 'cd_cliente':

tabelaServico.hasMany(tabelaServicoOS, {
  foreignKey: 'cd_servico'
});

// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaServicoOS.sync({alter:true});

module.exports = tabelaServicoOS;

