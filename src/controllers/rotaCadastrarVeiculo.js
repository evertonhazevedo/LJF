// importacao da tabela veiculo
const tabelaVeiculo = require("../migrations/veiculos");

//Criando funcao para cadastrar veiculo
async function cadastrarVeiculo(req, res) {

  //recuperando dados do formulário
  let dados = req.body;

  //verificando se veículo já existe
  const veiculo = await tabelaVeiculo.findOne({
    where: {
      placa: dados.placa
    }
  });

  if (veiculo != null) {
    return res.status(400).json({
      success: false,
      codigo: 01,
      mensagem: 'Veículo já cadastrado'
    });

  } else {

    //criando veículo na tabela veículos
    await tabelaVeiculo.create({

      tipo: dados.tipo,
      placa: dados.placa,
      marca: dados.marca,
      modelo: dados.modelo,
      cd_cliente: dados.cd_cliente

      //veículo cadastrado com sucesso
    }).then(function (veiculo) {
      return res.status(200).json({
        success: true,
        veiculo: veiculo,
        mensagem: 'Veículo cadastrado'
      });

      //erro ao cadastrar
    }).catch(function (error) {
      return res.status(400).json({
        success: false,
        codigo: 02,
        message: 'Não foi possível cadastrar o veículo' + error.message

      });
    });
  }
}

// exportando funcao cadastrar veículo
module.exports = cadastrarVeiculo;
