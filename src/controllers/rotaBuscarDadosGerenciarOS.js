const tabelaOrdemServico = require('../migrations/ordemServico');
const tabelaCliente = require('../migrations/cliente');
const tabelaVeiculo = require('../migrations/veiculos');
const tabelaServicoOS = require('../migrations/servicoOS');
const tabelaServico = require('../migrations/servico');

async function buscarDadosGerenciarOS(req, res) {

  const nomeServicos = [];

  const ordemServico = await tabelaOrdemServico.findOne({

    attributes: ['cd_cliente', 'cd_veiculo', 'valor_total', 'previsao', 'cd_pagamento'],

    where: {
      cd_ordem_servico: req.params.ordemServico
    }
  });

  if (ordemServico != null) {

    const cliente = await tabelaCliente.findOne({

      attributes: ['nome', 'sobrenome', 'email', 'telefone'],

      where: {
        cd_cliente: ordemServico.cd_cliente
      }
    });

    if (cliente != null) {

      const veiculo = await tabelaVeiculo.findOne({

        attributes: ['placa', 'marca', 'modelo'],

        where: {
          cd_veiculo: ordemServico.cd_veiculo
        }
      });

      if (veiculo != null) {

        const servicosOS = await tabelaServicoOS.findAll({

          attributes: ['cd_servico'],

          where: {
            cd_ordem_servico: req.params.ordemServico
          }
        });

        if (servicosOS != null && servicosOS != undefined) {

          for (let i = 0; i < servicosOS.length; i++) {

            const nomeServico = await tabelaServico.findOne({

              attributes: ['nm_servico'],

              where: {
                cd_servico: servicosOS[i].cd_servico
              }

            })

            if (nomeServico) {
              nomeServicos.push(nomeServico.nm_servico);
            }

          };

          if (nomeServicos != null && servicosOS != undefined) {

            const veiculos = await tabelaVeiculo.findAll({

              attributes: ['placa', 'marca', 'modelo'],

              where: {
                cd_cliente: ordemServico.cd_cliente
              }
            });

            if (veiculos != null && veiculos != undefined) {

              return res.status(200).json({
                success: true,
                cliente: cliente,
                ordemServico: ordemServico,
                veiculoOS: veiculo,
                veiculos: veiculos,
                servico: nomeServicos
              })
            }
          } else {

            return res.status(400).json({
              success: false,
              message: 'Erro ao buscar nome dos serviços.'
            })

          }

        } else {

          return res.status(400).json({
            success: false,
            message: 'Erro ao buscar serviços da os.'
          })

        }

      } else {

        return res.status(400).json({
          success: false,
          message: 'Erro ao buscar veiculo.'
        })

      }

    } else {

      return res.status(400).json({
        success: false,
        message: 'Erro ao buscar cliente.'
      })

    }

  } else {

    return res.status(400).json({
      success: false,
      message: 'Erro ao buscar ordem de servico.'
    })

  }
}
module.exports = buscarDadosGerenciarOS;