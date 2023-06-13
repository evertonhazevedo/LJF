const sequelize = require('../models/db');

async function buscarTodasOS(req, res){
   
  const [OS] = await sequelize.query(

    `SELECT os.*, vei.*, cli.*, os.previsao as tempo, IF(os.status = 0, "Aberta", "Finalizada") as situacao, pag.* from ordemServico os
     LEFT JOIN cliente cli ON os.cd_cliente = cli.cd_cliente
     LEFT JOIN veiculo vei ON os.cd_veiculo = vei.cd_veiculo
     LEFT JOIN pagamento pag ON os.cd_pagamento = pag.cd_pagamento
     ORDER BY os.cd_ordem_servico DESC`
  )


  try {

    return res.status(200).json({
      success: true,
      os: OS
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Não foi possível recuperar as OS. Movito: ' + error
    });
  }
}

module.exports = buscarTodasOS;