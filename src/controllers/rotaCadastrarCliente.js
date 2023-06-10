// importacao da tabela cliente
const tabelaCliente = require("../migrations/cliente");

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

    //Atualizando cliente
    await tabelaCliente.update({

      cpf: dados.cpf,
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      telefone: dados.telefone,
      email: dados.email
    },
      {
        where: {
          cpf: dados.cpf
        }

        //cliente atualizado com sucesso
      }).then(function (cliente) {

        return res.status(200).json({
          success: true,
          cliente: cliente,
          atualizado: true,
          message: 'Cliente Aualizado'
        });

      }).catch(function (error) {

        return res.status(400).json({
          success: false,
          codigo: '01',
          message: 'Erro ao atualizar o cliente. Motivo: ' + error
        });

      })

  } else {

    //criando cliente na tabela usuário
    await tabelaCliente.create({

      cpf: dados.cpf,
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      telefone: dados.telefone,
      email: dados.email

      //cliente cadastrado com sucesso
    }).then(function (cliente) {
      return res.status(200).json({
        success: true,
        atualizado: false,
        cliente: cliente,
        message: 'Cliente cadastrado'
      });

      //erro ao cadastrar
    }).catch(function (error) {
      return res.status(400).json({
        success: false,
        codigo: '02',
        message: 'nao foi possivel cadastrar o cliente' + error.message

      });
    });
  }
}

// exportando funcao cadastrar funcionario
module.exports = cadastrarCliente;




