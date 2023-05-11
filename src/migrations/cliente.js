const Sequelize = require('sequelize');
const db = require('../models/db');

//criando tabela Clientes

const tabelaCliente = db.define('cliente', {


  cd_cliente: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },

  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },

  sobrenome: {
    type: Sequelize.STRING,
    allowNull: false
  },

  telefone: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false

  }
}, { freezeTableName: true });

// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaCliente.sync();

module.exports = tabelaCliente;