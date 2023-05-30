// importacao da tabela usuario
const tabelaUsuario = require("../migrations/usuario");
const bcrypt = require('bcrypt');

//Criando funcao para deletar funcionario
async function deletarFuncionario(req, res) {

  //recuperando dados do formulario
  let dados = req.body;

  //verificando se funcionario ja existe
  const funcionario = await tabelaUsuario.findOne({
    where: {
      cpf: dados.cpf
    }
  });

  if (funcionario == null) {
    return res.status(400).json({
      success: false,
      codigo: 01,
      mensagem: 'usuario não encontrado'
    });

  } else {

    //deletando funcionario na tabela usuario
    await tabelaUsuario.destroy({
      cpf: dados.cpf

      //usuario deletado com sucesso
    }).then(async function (funcionario) {
      return res.status(200).json({
        success: true,
        funcionario: funcionario,
        mensagem: 'usuario deletado'
      });

      //erro ao deletar
    }).catch(async function (error) {
      return res.status(400).json({
        success: false,
        codigo: 02,
        message: 'nao foi possivel deletar o usuario' + error.message

      });
    });
  }
}

// Exportando função deletarFuncionario
module.exports = deletarFuncionario;




