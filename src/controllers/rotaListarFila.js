/*Importação das tabelas*/
const sequelize = require('../models/db');

/*Função para listar a fila*/
async function listarFila(req, res) {

  const [fila] = await sequelize.query(

    `SELECT fi.posicao, os.cd_ordem_servico, vei.placa, vei.marca, vei.modelo, mov.horario_entrada as entrada,  os.previsao, cli.nome as cliente  FROM fila fi
     LEFT JOIN ordemServico os ON fi.cd_ordem_servico = os.cd_ordem_servico
     LEFT JOIN veiculo vei ON os.cd_veiculo = vei.cd_veiculo
     LEFT JOIN cliente cli ON os.cd_cliente = cli.cd_cliente
     LEFT JOIN movimentacao mov ON os.cd_movimentacao = mov.cd_movimentacao;`
  )

  if (fila[0] != undefined) {
    return res.status(200).json({
      success: true,
      fila: fila
    });

  } else {
    return res.status(400).json({
      success: false,
      message: 'Não há nenhuma OS na fila!'
    });

  }

}

// Exportando função listarFila
module.exports = listarFila