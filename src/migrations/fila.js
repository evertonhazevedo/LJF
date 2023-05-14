const Sequelize = require('sequelize');
const db = require('../models/db');
const tabelaOrdemServico = require('./ordemServico');

//criando tabela Fila

const tabelaFila = db.define('fila', {

  cd_fila: {
    type: Sequelize.STRING,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  posicao: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

}, { freezeTableName: true });

// Relacionamento 1-1:

tabelaFila.belongsTo(tabelaOrdemServico, {
  constraint: true,
  foreignKey: 'cd_ordem_servico',
  allowNull: false

});

// relacionamento 1 - vários:

tabelaOrdemServico.hasMany(tabelaFila, {
  foreignKey: 'cd_ordem_servico'
});

// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaFila.sync();

module.exports = tabelaFila;