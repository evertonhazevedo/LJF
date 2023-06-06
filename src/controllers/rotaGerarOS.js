/*Importação das tabelas*/
const tabelaOrdemServico = require('../migrations/ordemServico');
const tabelaServico = require('../migrations/servico');
const tabelaServicoOS = require('../migrations/servicoOS');
const tabelaBaia = require('../migrations/baia');
const tabelaFila = require('../migrations/fila');
const sequelize = require('../models/db');

/*Rota  para gerar a OS*/
async function gerarOS(req, res) {

  let body = req.body;

  //buscando baia disponível
  const baia = await tabelaBaia.findOne({
    where: {
      status: '0' //Status Livre
    }
  })
  //se encontrar baia disponível entra
  if (baia != null) {

    //insere na tabela movimentacao
    try {

      const [movimentacao] = await sequelize.query(

        `INSERT INTO movimentacao VALUES (null, sysdate(), sysdate(), null, null, sysdate(), sysdate())`
      )

      //se conseguir inserir na movimentacao entra
      if (movimentacao != null) {

        //criando ordem de servico
        await tabelaOrdemServico.create({

          cd_cliente: body.cliente,
          cd_veiculo: body.veiculo,
          cd_movimentacao: movimentacao,
          cd_baia: baia.cd_baia,
          valor_total: body.valor_total,
          previsao: body.previsaoConvertida,
          status: '0' //Status em aberto

        }).then(async function (ordemServico) {

          try {
            //pega cada servico e buscr pelo nome na tabela de servico 
            body.servico.forEach(async element => {

              const servico = await tabelaServico.findOne({
                where: {
                  nm_servico: element
                }
              })

              if (servico != null) {

                //insere na tabela de servicoOS com o cd_servico correspondente
                await tabelaServicoOS.create({

                  cd_ordem_servico: ordemServico.cd_ordem_servico,
                  cd_servico: servico.cd_servico

                })
              }
            });

            //Atualizando a baia para ocupada
            await tabelaBaia.update({

              status: 1
            },

              {

                where: { cd_baia: baia.cd_baia }

              }).then(function () {

                //retorno de sucesso
                return res.status(200).json({
                  success: true,
                  fila: false,
                  baia: baia.cd_baia,
                  ordemServico: ordemServico,
                  message: 'OS gerada com sucesso'
                });
              }).catch(function (error) {
                return res.status(400).json({
                  success: false,
                  codigo: 04,
                  message: 'Nao foi possível atualizar a baia. Motivo: ' + error.message
                });
              })

          } catch (error) {

            return res.status(400).json({
              success: false,
              codigo: 03,
              message: 'Nao foi possível inserir o registro na tabela servicoOS. Motivo: ' + error.message
            });

          }
        }).catch(function (error) {

          return res.status(400).json({
            success: false,
            codigo: 02,
            message: 'Nao foi possível inserir o registro na tabela ordemServico. Motivo: ' + error.message
          });

        });
      }
    } catch (error) {

      return res.status(400).json({
        success: false,
        codigo: 01,
        message: 'Nao foi possível inserir o registro na tabela movimentação. Motivo: ' + error.message
      });
    }

    //Se nao achar baia livre entra
  } else {

    //insere na tabela movimentacao
    try {

      const [movimentacao] = await sequelize.query(

        `INSERT INTO movimentacao VALUES (null, sysdate(), sysdate(), null, null, sysdate(), sysdate())`
      )

      //se conseguir inserir na movimentacao entra
      if (movimentacao != null) {

        //criando ordem de servico
        await tabelaOrdemServico.create({

          cd_cliente: body.cliente,
          cd_veiculo: body.veiculo,
          cd_movimentacao: movimentacao,
          valor_total: body.valor_total,
          previsao: body.previsaoConvertida,
          status: '0' //Status em aberto

        }).then(async function (ordemServico) {

          try {

            //Recuperando ultima os da fila
            const [ultimoFila] = await sequelize.query(

              `select IFNULL(max(posicao) , 0) as posicao from fila `
            )

            var fila = null;

            //Se nao houver fila  entra
            if (ultimoFila[0].posicao != '0') {

              //Atualizando a baia para ocupada
              fila = await tabelaFila.create({
                posicao: ultimoFila[0].posicao + 1,
                cd_ordem_servico: ordemServico.cd_ordem_servico

              });

            } else {

              //Setando como primeiro da fila
              fila = await tabelaFila.create({
                posicao: 1,
                cd_ordem_servico: ordemServico.cd_ordem_servico

              });
            }

            try {

              //pega cada servico e buscr pelo nome na tabela de servico 
              await body.servico.forEach(async element => {

                const servico = await tabelaServico.findOne({
                  where: {
                    nm_servico: element
                  }
                })

                if (servico != null) {

                  //insere na tabela de servicoOS com o cd_servico correspondente
                  await tabelaServicoOS.create({

                    cd_ordem_servico: ordemServico.cd_ordem_servico,
                    cd_servico: servico.cd_servico

                  })
                }
              });

              return res.status(200).json({
                success: true,
                fila: true,
                ultimo: ultimoFila,
                posicaoFila: fila.posicao,
                ordemServico: ordemServico,
                message: 'OS gerada com sucesso.'
              });

            } catch (error) {

              return res.status(400).json({
                success: false,
                codigo: 04,
                message: 'Nao foi possível inserir o registro na tabela servicoOS. Motivo: ' + error.message
              });

            }

          } catch (error) {

            return res.status(400).json({
              success: false,
              codigo: 03,
              message: 'Nao foi possível inserir o registro na tabela fila. Motivo: ' + error.message
            });

          }

        }).catch(function (error) {

          return res.status(400).json({
            success: false,
            codigo: 02,
            message: 'Nao foi possível inserir o registro na tabela ordemServico. Motivo: ' + error.message
          });

        });
      }
    } catch (error) {

      return res.status(400).json({
        success: false,
        codigo: 01,
        message: 'Nao foi possível inserir o registro na tabela movimentação. Motivo: ' + error.message
      });
    }
  }

}
module.exports = gerarOS;