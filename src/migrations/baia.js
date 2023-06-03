const Sequelize = require('sequelize');
const db = require('../models/db');

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
  }

}, { freezeTableName: true });

// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaBaia.sync();

module.exports = tabelaBaia;