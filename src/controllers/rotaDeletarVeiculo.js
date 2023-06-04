// importacao da tabela veiculos
const tabelaVeiculo = require("../migrations/veiculos");

//Criando funcao para deletar veículo
async function deletarVeiculo(req, res) {

  //recuperando dados do formulario
  let dados = req.body;

  //verificando se veículo ja existe
  const veiculo = await tabelaVeiculo.findOne({
    where: {
      placa: dados.placa
    }
  });

  if (veiculo == null) {
    return res.status(400).json({
      success: false,
      codigo: 01,
      mensagem: 'Veículo não encontrado'
    });

  } else {

    //deletando veículo na tabela veiculos
    await tabelaVeiculo.destroy({
      where: {
        placa: dados.placa
      }
      //veículo deletado com sucesso
    }).then(async function () {
      return res.status(200).json({
        success: true,
        mensagem: 'Veículo deletado'
      });

      //erro ao deletar
    }).catch(async function (error) {
      return res.status(400).json({
        success: false,
        codigo: 02,
        message: 'Não foi possível deletar o veículo' + error.message

      });
    });
  }
}

// Exportando função deletarVeiculo
module.exports = deletarVeiculo;




