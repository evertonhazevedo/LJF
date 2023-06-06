/*Importação das tabelas*/
const sequelize = require('../models/db');

/*Função para listar os serviços*/
async function recuperarOS(req, res) {

  //Recuperando os em aberto que estão em alguma baia
  const [ordemServico] = await sequelize.query(

    `SELECT * FROM ordemServico os
       INNER JOIN cliente cli ON os.cd_cliente = cli.cd_cliente
       INNER JOIN veiculo vei ON os.cd_veiculo = vei.cd_veiculo
       WHERE os.cd_baia is not null
       AND os.status = 0;`
  )

  if (ordemServico[0] != undefined) {
    return res.status(200).json({
      success: true,
      ordemServico: ordemServico
    });

  } else {
    return res.status(400).json({
      success: false,
      message: 'Não há nenhuma OS sendo atendida!'
    });

  }

}

module.exports = recuperarOS;