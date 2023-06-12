/*Importação das tabelas*/
const tabelaOrdemServico = require('../migrations/ordemServico');
const tabelaServico = require('../migrations/servico');
const tabelaServicoOS = require('../migrations/servicoOS');
const sequelize = require('../models/db');

/*Rota  para gerar a OS*/
async function editarOS(req, res) {

  let body = req.body;

  //criando ordem de servico
  await tabelaOrdemServico.update({

    cd_veiculo: body.veiculo,
    valor_total: body.valor_total,
    previsao: body.previsaoConvertida
  },
    {
      where: {
        cd_ordem_servico: body.cd_ordem_servico
      }

    }).then(async function () {

      //pega cada servico e busca pelo nome na tabela de servico 
      body.servico.forEach(async element => {

        const servico = await tabelaServico.findOne({
          where: {
            nm_servico: element
          }
        })

        if (servico != null) {

          const [servicoExistente] = await sequelize.query(
            `SELECT * FROM servicoOS WHERE cd_Servico = ` + servico.cd_servico + ` AND cd_ordem_servico = ` + body.cd_ordem_servico
          )

          if (servicoExistente == '') {

            //insere na tabela de servicoOS com o cd_servico correspondente
           await tabelaServicoOS.create({

              cd_ordem_servico: body.cd_ordem_servico,
              cd_servico: servico.cd_servico

            });
          }

        }
      })

      return res.status(200).json({
        success: true
      });

    }).catch(function (error) {
      return res.status(400).json({
        success: false,
        codigo: '01',
        message: 'Nao foi possível inserir o registro na tabela ordemServico. Motivo: ' + error.message
      });
    })
}

module.exports = editarOS;