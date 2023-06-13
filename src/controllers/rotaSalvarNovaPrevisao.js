// Importação das tabelas
const tabelaOrdemServico = require('../migrations/ordemServico');

async function salvarNovaPrevisao(req, res) {

  let body = req.body;
  let ordemServicoAtualizada = [];

  for (let i = 0; i < body.ordemServico.length; i++) {

    ordemServicoAtualizada = await tabelaOrdemServico.update({

      previsao: body.novaPrevisao[i]

    },
      {

        where: {
          cd_ordem_servico: body.ordemServico[i]
        }

      });
  }

  if (ordemServicoAtualizada == true) {

    try {

      return res.status(200).json({
        success: true,
        message: 'Atualizado com sucesso'
      });

    } catch (error) {

      return res.status(400).json({
        success: true,
        message: 'Erro ao atualizar nova previsão. Motivo: ' + error
      });

    };
  }
}

module.exports = salvarNovaPrevisao;