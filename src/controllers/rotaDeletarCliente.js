// importacao da tabela cliente
const tabelaCliente = require("../migrations/cliente");
const tabelaVeiculos = require("../migrations/veiculos");

//Criando funcao para deletar cliente
async function deletarCliente(req, res) {

  //recuperando dados do formulario
  let dados = req.body;

  //verificando se cliente ja existe
  const cliente = await tabelaCliente.findOne({
    where: {
      cpf: dados.cpf
    }
  });

  if (cliente == null) {
    return res.status(400).json({
      success: false,
      codigo: '01',
      mensagem: 'Cliente não encontrado'
    });

  } else {

    //deletando cliente na tabela cliente
    await tabelaVeiculos.destroy({
      where: {
        cd_cliente: cliente.cd_cliente
      }
      //cliente deletado com sucesso
    }).then(async function () {

      //deletando cliente na tabela cliente
      await tabelaCliente.destroy({
        where: {
          cpf: dados.cpf
        }
        //cliente deletado com sucesso
      }).then(async function () {

        return res.status(200).json({
          success: true,
          mensagem: 'Cliente deletado'
        });

        //erro ao deletar
      }).catch(async function (error) {

        return res.status(400).json({
          success: false,
          codigo: '02',
          message: 'Não foi possível deletar o cliente' + error.message

        });
      });

      //erro ao deletar
    }).catch(async function (error) {

      return res.status(400).json({
        success: false,
        codigo: '01',
        message: 'Não foi possível deletar os veículos do cliente' + error.message

      });
    });
  }
}

// Exportando função deletarCliente
module.exports = deletarCliente;




