const Sequelize = require('sequelize');
const db = require('../models/db');
const tabelaOrdemServico = require('./ordemServico');

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
    type: Sequelize.NUMBER,
    allowNull: false
  },

  dt_pagamento: {
    type: Sequelize.DATE,
    allowNull: false
  },

}, { freezeTableName: true });

// Relacionamento 1-1:

tabelaPagamento.belongsTo(tabelaOrdemServico, {
  constraint: true,
  foreignKey: 'cd_ordem_servico',
  allowNull: false

});

// relacionamento 1 - vários:

tabelaOrdemServico.hasMany(tabelaPagamento, {
  foreignKey: 'cd_ordem_servico'
});

// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaPagamento.sync();

module.exports = tabelaPagamento;