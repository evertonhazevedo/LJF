/*Importação das tabelas*/
const tabelaOrdemServico = require('../migrations/ordemServico');
const tabelaFila = require('../migrations/fila');
const tabelaBaia = require('../migrations/baia');
const sequelize = require('../models/db');

/*Importação das bibliotecas*/
const twilio = require('twilio');
require('dotenv').config();


/*Função para listar fazer o checkout da baia*/
async function liberarBaia(req, res) {

  // Recuperando dados do body
  let body = req.body;

  //Instanciando objeto client Twilio
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


  await tabelaOrdemServico.update({

    status: 1 // Status Finalizada
  },
    {
      where: {
        cd_ordem_servico: body.cd_ordem_servico
      }

    }).then(async function () {

      await tabelaFila.findOne({

      }).then(async function (primeiroFila) {

        //Se nao houver ninguem na fila apenas atualiza a baia para livre
        if (primeiroFila == null || primeiroFila == undefined) {

          tabelaBaia.update({

            status: 0 // Baia Livre
          },
            {
              where: {
                cd_baia: body.cd_baia
              }

            }).then(async function () {


              await client.messages.create({

                body: 'Ola ' + body.nome + '! Estamos passando rapidinho para te avisar que o seu veículo já esta pronto para retirada. Att. Equipe LJF',
                from: process.env.TWILIO_WHATS_APP,
                to: 'whatsapp:+55' + body.whatsapp

              }).then(function (mensagem) {

                return res.status(200).json({
                  success: true,
                  primeiroFila: primeiroFila,
                  message: mensagem
                });

              }).catch(function (error) {

                return res.status(400).json({
                  success: false,
                  message: 'Não possível enviar a mensagem. Motivo: ' + error
                });

              })

            }).catch(function (error) {

              return res.status(400).json({
                success: false,
                message: 'Não possível atualizar o status da baia. Motivo: ' + error
              });
            })

        } else {

          try {

            const [proximoFila] = await sequelize.query(

              `SELECT os.cd_ordem_servico, vei.placa, vei.modelo, os.previsao,  cli.nome  FROM fila fi
            LEFT JOIN ordemServico os ON fi.cd_ordem_servico = os.cd_ordem_servico
            LEFT JOIN veiculo vei ON os.cd_veiculo = vei.cd_veiculo
            LEFT JOIN cliente cli ON os.cd_cliente = cli.cd_cliente
            LEFT JOIN movimentacao mov ON os.cd_movimentacao = mov.cd_movimentacao
            WHERE os.cd_ordem_servico = ` + primeiroFila.cd_ordem_servico

            );

            try {

              await tabelaOrdemServico.update({
                cd_baia: body.cd_baia
              },
                {
                  where: {
                    cd_ordem_servico: proximoFila[0].cd_ordem_servico
                  }

                }).then(async function () {

                  await tabelaFila.destroy({

                    where: {
                      cd_ordem_servico: proximoFila[0].cd_ordem_servico
                    }

                  }).then(async function () {

                    try {

                      //Pegando todos os registros restantes na fila
                      const filaAtualizada = await tabelaFila.findAll({});

                      //Para cada elemento da tabela fila que restou atualiza a posição (Anda com a fila)
                      await filaAtualizada.forEach(async element => {

                        await tabelaFila.update({

                          posicao: element.posicao - 1
                        },
                          {
                            where: {
                              cd_fila: element.cd_fila
                            }

                          })

                      });

                      try {

                        await client.messages.create({

                          body: 'Ola ' + body.nome + '! Estamos passando rapidinho para te avisar que o seu veículo já esta pronto para retirada. Att. Equipe LJF',
                          from: process.env.TWILIO_WHATS_APP,
                          to: 'whatsapp:+55' + body.whatsapp

                        }).then(function (mensagem) {

                          return res.status(200).json({
                            success: true,
                            primeiroFila: primeiroFila,
                            message: mensagem
                          });

                        }).catch(function (error) {

                          return res.status(400).json({
                            success: false,
                            message: 'Não possível enviar o sms. Motivo: ' + error
                          });

                        })

                      } catch (error) {

                        return res.status(400).json({
                          success: false,
                          message: 'Não possível enviar o sms. Motivo: ' + error
                        });

                      }

                    } catch (error) {

                      return res.status(400).json({
                        success: false,
                        message: 'Não possível atualizar a fila. Motivo: ' + error
                      });
                    }

                  }).catch(function (error) {

                    return res.status(400).json({
                      success: false,
                      message: 'Não possível excluir a os da fila. Motivo: ' + error
                    });

                  })

                }).catch(function (error) {

                  return res.status(400).json({
                    success: false,
                    message: 'Não possível atualizar o campo cd_baia da os. Motivo: ' + error
                  });

                })

            } catch (error) {

              return res.status(400).json({
                success: false,
                message: 'Não possível recuperar o primeiro da fila. Motivo: ' + error
              });

            }

          } catch (error) {

            return res.status(400).json({
              success: false,
              message: 'Não possível recuperar os dados do próximo da fila. Motivo: ' + error
            });

          }

        }

      }).catch(function (error) {

        return res.status(400).json({
          success: false,
          message: 'Não possível recuperar o primeiro da fila. Motivo: ' + error
        });

      })

    }).catch(function (error) {

      return res.status(400).json({
        success: false,
        message: 'Não possível atualizar o status da OS. Motivo: ' + error
      });

    })

}

// Exportando função listarFila
module.exports = liberarBaia