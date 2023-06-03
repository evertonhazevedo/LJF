/*Importação das tabelas*/
const tabelaOrdemServico = require('../migrations/ordemServico');
const tabelaServico = require('../migrations/servico');
const tabelaServicoOS = require('../migrations/servicoOS');
const tabelaBaia = require('../migrations/baia');
const sequelize = require('../models/db');

async function gerarOS(req, res) {

  let body = req.body;

  //buscando baia disponível
  const baia = await tabelaBaia.findOne({
    where:{
      status: '0'
    }
  })

  if(baia != null){

  }else{

  }

  // try {
  //   console.log('entrou no try');
  //   const [movimentacao] = await sequelize.query(

  //     `INSERT INTO movimentacao VALUES (null, sysdate(), sysdate(), null, null, sysdate(), sysdate())`
  //   )
  //   console.log('Movimentação: ' + movimentacao);

  //   if (movimentacao != null) {
  //     console.log('inseriu na movimentacao');
  //     await tabelaOrdemServico.create({

  //       cd_cliente: req.params.cliente,
  //       cd_veiculo: req.params.veiculo,
  //       cd_movimentacao: movimentacao

  //     }).then(async function (ordemServico) {

  //       try {

  //         body.servico.forEach(async element => {

  //           const servico = await tabelaServico.findOne({
  //             where: {
  //               nm_servico: element
  //             }
  //           })

  //           if (servico != null) {

  //             await tabelaServicoOS.create({

  //               cd_ordem_servico: ordemServico.cd_ordem_servico,
  //               cd_servico: servico.cd_servico

  //             })
  //           }
  //         })

  //         return res.status(200).json({
  //           success: true,
  //           ordemServico: ordemServico,
  //           message: 'OS gerada com sucesso'
  //         });

  //       } catch (error) {

  //         return res.status(400).json({
  //           success: false,
  //           codigo: 03,
  //           message: 'Nao foi possível inserir o registro na tabela servicoOS. Motivo: ' + error.message
  //         });

  //       }

  //     }).catch(function (error) {

  //       return res.status(400).json({
  //         success: false,
  //         codigo: 02,
  //         message: 'Nao foi possível inserir o registro na tabela ordemServico. Motivo: ' + error.message
  //       });

  //     });
  //   }
  // } catch (error) {

  //   return res.status(400).json({
  //     success: false,
  //     codigo: 01,
  //     message: 'Nao foi possível inserir o registro na tabela movimentação. Motivo: ' + error.message
  //   });

  // }

}

module.exports = gerarOS;