/*Importação das tabelas*/
const sequelize = require('../models/db');

/*Função para listar os serviços*/
async function preencherSelectBaias(req, res) {

  //Recuperando os em aberto que estão em alguma baia
  const [selectBaias] = await sequelize.query(

    `SELECT ba.cd_baia, os.cd_ordem_servico, cli.nome, cli.telefone FROM baia ba
     INNER JOIN ordemServico os ON ba.cd_baia = os.cd_baia
     INNER JOIN cliente cli ON os.cd_cliente = cli.cd_cliente
     AND os.status = 0
     ORDER BY ba.cd_baia ASC;`

  );

  try {

    return res.status(200).json({
      success: true,
      baias: selectBaias
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Não foi possível recuperar as baias. Movito: ' + error
    });
  }

}

module.exports = preencherSelectBaias;