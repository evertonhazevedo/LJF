const tabelaPagamento = require('../migrations/pagamento');
const tabelaOrdemServico = require('../migrations/ordemServico');

async function realizarPagamento(req, res){

  let body = req.body;
  const date = new Date()

  await tabelaPagamento.create({

    forma_pagamento: body.forma_pagamento, 
    valor: body.valor, 
    dt_pagamento: date, 
    vl_pago: body.vl_pago,
    troco: body.troco

  }).then(async function (pagamento) {

    await tabelaOrdemServico.update({

      cd_pagamento: pagamento.cd_pagamento
    },

    {

      where: {
        cd_ordem_servico: body.cd_ordem_servico
      }

    }).then(function (){
      return res.status(200).json({
        success: true
      });
    }).catch(function (error){
      return res.status(400).json({
        success: false,
        codigo: '02',
        message: 'Não foi possível atualizar a ordem de serviço. Movito: ' + error
      });
    })

  }).catch(function (error){
    return res.status(400).json({
      success: false,
      codigo: '01',
      message: 'Não foi possível inserir o pagamento. Movito: ' + error
    });
  })
}

module.exports = realizarPagamento;