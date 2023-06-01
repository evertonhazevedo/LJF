// importacao da tabela usuario
const tabelaUsuario = require("../migrations/usuario");
const bcrypt = require('bcrypt');

//Criando funcao para cadastrar funcionario
async function cadastrarFuncionario(req, res) {

  //recuperando dados do formulario
  let dados = req.body;

  //verificando se funcionario ja existe
  const funcionario = await tabelaUsuario.findOne({
    where: {
      cpf: dados.cpf
    }
  });

  if (funcionario != null) {
    return res.status(400).json({
      success: false,
      codigo: 01,
      mensagem: 'usuario já cadastrado'
    });

  } else {

    //criando funcionario na tabela usuario
    await tabelaUsuario.create({
      nome: dados.nome,
      sobrenome: dados.sobrenome,
      email: dados.email,
      nm_usuario: dados.nm_usuario,
      senha: await bcrypt.hash(dados.senha, 8),
      cpf: dados.cpf

      //usuario cadastrado com sucesso
    }).then(function (funcionario) {
      return res.status(200).json({
        success: true,
        funcionario: funcionario,
        mensagem: 'usuario cadastrado'
      });

      //erro ao cadastrar
    }).catch(function (error) {
      return res.status(400).json({
        success: false,
        codigo: 02,
        message: 'nao foi possivel cadastrar o usuario' + error.message
      
      });
    });
  }
}

// exportando funcao cadastrar funcionario
module.exports = cadastrarFuncionario;




