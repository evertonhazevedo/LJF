/*Importação das tabelas*/
const sequelize = require('../models/db');
const tabelaBaia = require('../migrations/baia');

/*Função para listar os serviços*/
async function recuperarBaiasOS(req, res) {


  const baias = await tabelaBaia.findAll();

  if (baias != null) {

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
        ordemServico: ordemServico,
        baias: baias
      });

    } else if (ordemServico[0] == undefined && baias != null) {
      return res.status(200).json({
        success: true,
        baias: baias,
        ordemServico: ordemServico,
        message: 'Não há nenhuma OS sendo atendida!'
      });

    }else{
      return res.status(400).json({
        success: true,
        message: 'Erro ao buscar dados!'
      });
    }

  }
}
module.exports = recuperarBaiasOS;