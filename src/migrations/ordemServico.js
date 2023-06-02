const Sequelize = require('sequelize');
const db = require('../models/db');
const tabelaCliente = require('./cliente');
const tabelaVeiculo = require('./veiculos');
const tabelaMovimentacao = require('./movimentacao');

//criando tabela Ordem de Servicos

const tabelaOrdemServico = db.define('ordemServico', {

  cd_ordem_servico: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }

}, { freezeTableName: true });

// // Relacionamento 1-1 'cd_servico':

// tabelaOrdemServico.belongsTo(tabelaServico, {
//   constraint: true,
//   foreignKey: 'cd_servico',
//   allowNull: false

// });

// // relacionamento 1 - vários 'cd_servico':

// tabelaServico.hasMany(tabelaOrdemServico, {
//   foreignKey: 'cd_servico'
// });

// Relacionamento 1-1 'cd_cliente':

tabelaOrdemServico.belongsTo(tabelaCliente, {
  constraint: true,
  foreignKey: 'cd_cliente',
  allowNull: false
});

// relacionamento 1 - vários 'cd_cliente':

tabelaCliente.hasMany(tabelaOrdemServico, {
  foreignKey: 'cd_cliente'
});

// Relacionamento 1-1 cd_veiculo:

tabelaOrdemServico.belongsTo(tabelaVeiculo, {
  constraint: true,
  foreignKey: 'cd_veiculo',
  allowNull: false
});

// relacionamento 1 - vários cd_veiculo:

tabelaVeiculo.hasMany(tabelaOrdemServico, {
  foreignKey: 'cd_veiculo'
});

// Relacionamento 1-1:

tabelaOrdemServico.belongsTo(tabelaMovimentacao, {
  constraint: true,
  foreignKey: 'cd_movimentacao',
  allowNull: false

});

// relacionamento 1-1:

tabelaMovimentacao.belongsTo(tabelaOrdemServico, {
  foreignKey: 'cd_movimentacao'
});



// Método para verificar se tabela já existe. Caso nao, irá criar tabela.

tabelaOrdemServico.sync();

module.exports = tabelaOrdemServico;