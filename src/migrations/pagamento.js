const Sequelize = require('sequelize');
const db = require('../models/db');

//criando tabela Pagamento

const tabelaPagamento = db.define('pagamento', {

  cd_pagamento: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  forma_pagamento: {
    type: Sequelize.STRING,
    allowNull: false
  },

  valor: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },

  vl_pago: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },

  troco: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },

  dt_pagamento: {
    type: Sequelize.DATE,
    allowNull: false
  }

}, { freezeTableName: true });

// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaPagamento.sync({alter:true});

module.exports = tabelaPagamento;