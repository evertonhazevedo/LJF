// importacao da tabela cliente
const tabelaCliente = require("../migrations/cliente");
const bcrypt = require('bcrypt');

//Criando funcao para cadastrar cliente
async function cadastrarCliente(req, res) {

  //recuperando dados do formulário
  let dados = req.body;

  //verificando se cliente já existe
  const cliente = await tabelaCliente.findOne({
    where: {
      cpf: dados.cpf
    }
  });

  if (cliente != null) {
    return res.status(400).json({
      success: false,
      codigo: 01,
      mensagem: 'Cliente já cadastrado'
    });

  } else {

    //criando cliente na tabela usuário
    await tabelaCliente.create({
      cd_cliente: dados.cd_cliente,
      cpf: dados.cpf,
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      telefone: dados.telefone,
      email: dados.email

      //cliente cadastrado com sucesso
    }).then(function (cliente) {
      return res.status(200).json({
        success: true,
        cliente: cliente,
        mensagem: 'Cliente cadastrado'
      });

      //erro ao cadastrar
    }).catch(function (error) {
      return res.status(400).json({
        success: false,
        codigo: 02,
        message: 'nao foi possivel cadastrar o cliente' + error.message

      });
    });
  }
}

// exportando funcao cadastrar funcionario
module.exports = cadastrarCliente;




