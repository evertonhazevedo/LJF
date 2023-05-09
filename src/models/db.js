const Sequelize = require('sequelize');

const sequelize = new Sequelize('bdlavajatoficr', 'root', 'lavajatoficr', {

  host: '34.95.148.80',
  dialect: 'mysql'

});

sequelize.authenticate()
.then(() => {
  console.log("Conexão com o banco de dados realizada com sucesso!");

}).catch((error) => {
  console.log("Erro: Conexão com o banco de dados não foi realizada com sucesso!" + error);
});

module.exports = sequelize;