const tabelaVeiculos = require('../migrations/veiculos')

async function editarVeiculo(req, res){

  let body = req.body;

  await tabelaVeiculos.update({

    tipo: body.tipo,
    placa: body.placa,
    marca: body.marca,
    modelo: body.modelo
  },
  {
    where:{
      cd_veiculo: body.cd_veiculo
    }
  }).then(function (veiculo){

    return res.status(200).json({
      success: true,
      veiculo: veiculo
    });

  }).catch(function(error){

    return res.status(400).json({
      success: true,
      message:  'Não foi possível atualizar o veículo. Motivo: ' + error
    });

  });

}

module.exports = editarVeiculo;