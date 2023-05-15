const Sequelize = require('sequelize');
const db = require('../models/db');

//criando tabela Servicos

const tabelaServico = db.define('servico', {

  cd_servico: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  nm_servico: {
    type: Sequelize.STRING,
    allowNull: false
  },

  valor: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }

}, { freezeTableName: true });

// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaServico.sync();

module.exports = tabelaServico;