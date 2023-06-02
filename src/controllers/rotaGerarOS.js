/*Importação das tabelas*/
const tabelaOrdemServico = require('../migrations/ordemServico');
const tabelaServico = require('../migrations/servico');
const tabelaServicoOS = require('../migrations/servicoOS');
const tabelaMovimentacao = require('../migrations/movimentacao');

async function gerarOS(req, res) {

  let body = req.body;

  await tabelaOrdemServico.create({

    cd_cliente: req.params.cliente,
    cd_veiculo: req.params.veiculo

  }).then(async function (ordemServico) {

    try {

      body.servico.forEach(async element => {

        const servico = await tabelaServico.findOne({
          where: {
            nm_servico: element
          }
        })

        if (servico != null) {

          await tabelaServicoOS.create({

            cd_ordem_servico: ordemServico.cd_ordem_servico,
            cd_servico: servico.cd_servico

          })
        }
      })

      return res.status(200).json({
        success: true,
        ordemServico: ordemServico,
        message: 'OS gerada com sucesso'
      });
      
    } catch (error) {

      return res.status(400).json({
        success: false,
        codigo: 02,
        message: 'Nao foi possível inserir o registro na tabela servicoOS'
      });

    }

    // await tabelaMovimentacao.create({
    //   dt_entrada: ,
    //   horario_entrada: ,
    //   cd_ordem_servico: ordemServico.cd_ordem_servico,
    // })

  }).catch(function (error) {

    return res.status(400).json({
      success: false,
      codigo: 01,
      message: 'Nao foi possível inserir o registro na tabela ordemServico' + error.message
    });

  });
}

module.exports = gerarOS;