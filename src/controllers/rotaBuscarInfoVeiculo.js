/*Importação das tabelas*/
const tabelaVeiculo = require('../migrations/veiculos');

/*Função para buscar a placa*/
async function buscarInfoVeiculo(req, res) {

  const infoVeiculo = await tabelaVeiculo.findOne({
    where: {
      placa: req.params.placa
    }
  })

  if (infoVeiculo != null) {

      return res.status(200).json({
        success: true,
        infoVeiculo: infoVeiculo
      });

  } else {

    return res.status(400).json({
      success: false,
      message: 'Veículo não cadastrado!'
    });

  }

}

// Exportando função listarServicos
module.exports = buscarInfoVeiculo;