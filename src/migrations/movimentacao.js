const Sequelize = require('sequelize');
const db = require('../models/db');
const tabelaOrdemServico = require('./ordemServico');

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
    allowNull: false
  },

  horario_saida: {
    type: Sequelize.TIME,
    allowNull: false
  },

}, { freezeTableName: true });

// Relacionamento 1-1:

tabelaMovimentacao.belongsTo(tabelaOrdemServico, {
  constraint: true,
  foreignKey: 'cd_ordem_servico',
  allowNull: false

});

// relacionamento 1 - vários:

tabelaOrdemServico.hasMany(tabelaMovimentacao, {
  foreignKey: 'cd_ordem_servico'
});


// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaMovimentacao.sync();

module.exports = tabelaMovimentacao;