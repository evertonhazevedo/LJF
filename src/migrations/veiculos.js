const Sequelize = require('sequelize');
const db = require('../models/db');
const tabelaCliente = require('./cliente');

//criando tabela Veículos

const tabelaVeiculo = db.define('veiculo', {

  cd_veiculo: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true

  },

  placa: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },

  marca: {
    type: Sequelize.STRING,
    allowNull: false
  },

  modelo: {
    type: Sequelize.STRING,
    allowNull: false
  },

}, { freezeTableName: true });

// Relacionamento 1-1:

tabelaVeiculo.belongsTo(tabelaCliente, {
  constraint: true,
  foreignKey: 'cd_cliente',
  allowNull: false

});

// relacionamento 1 - vários:

tabelaCliente.hasMany(tabelaVeiculo, {
  foreignKey: 'cd_cliente'
});

// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaVeiculo.sync();

module.exports = tabelaVeiculo;