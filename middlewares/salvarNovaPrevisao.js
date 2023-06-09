// Importação das tabelas
const tabelaOrdemServico = require('../src/migrations/ordemServico');

module.exports = {

  novaPrevisao: async function salvarNovaPrevisao(req, res, next) {

    let body = req.body;
    let ordemServicoAtualizada;

    ordemServicoAtualizada = await tabelaOrdemServico.update({

      previsao: body.novaPrevisao

    },
      {

        where: {
          cd_ordem_servico: body.os
        }

      });

    if (ordemServicoAtualizada == true) {

      try {

        next();

      } catch (error) {

        return res.status(400).json({
          success: true,
          message: 'Erro ao atualizar nova previsão. Motivo: ' + error
        });

      };
    }
  }

}