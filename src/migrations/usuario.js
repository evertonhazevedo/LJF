const Sequelize = require('sequelize');
const db = require('../models/db');

//criando tabela usuário

const tabelaUsuario = db.define('usuario', {
  cd_usuario: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },

  sobrenome: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false
  },

  nm_usuario: {
    type: Sequelize.STRING,
    allowNull: false
  },

  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },

  cpf: {
    type: Sequelize.STRING,
    allowNull: false
  }

}, { freezeTableName: true });

// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaUsuario.sync({alter: true });

module.exports = tabelaUsuario;
