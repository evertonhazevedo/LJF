const Sequelize = require('sequelize');
const db = require('../models/db');

//criando tabela Movimentacao

const tabelaMovimentacao = db.define('movimentacao', {

  cd_movimentacao: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true

  },

  dt_entrada: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },

  horario_entrada: {
    type: Sequelize.TIME,
    allowNull: false
  },

  dt_saida: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },

  horario_saida: {
    type: Sequelize.TIME,
    allowNull: true
  }

}, { freezeTableName: true });

// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaMovimentacao.sync();

module.exports = tabelaMovimentacao;