const Sequelize = require('sequelize');
const db = require('../models/db');
const tabelaOrdemServico = require('./ordemServico');

//criando tabela Baia

const tabelaBaia = db.define('baia', {

  cd_baia: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  status: {
    type: Sequelize.STRING,
    allowNull: false
  },

}, { freezeTableName: true });

// Relacionamento 1-1:

tabelaBaia.belongsTo(tabelaOrdemServico, {
  constraint: true,
  foreignKey: 'cd_ordem_servico',
  allowNull: false

});

// relacionamento 1 - vários:

tabelaOrdemServico.hasMany(tabelaBaia, {
  foreignKey: 'cd_ordem_servico'
});

// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaBaia.sync();

module.exports = tabelaBaia;