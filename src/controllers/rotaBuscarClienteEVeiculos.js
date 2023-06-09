/*Importação das tabelas*/
const tabelaCliente = require('../migrations/cliente');
const tabelaVeiculo = require('../migrations/veiculos');

/*Função para buscar a as informações do cliente e seus veiculos cadastrados*/
async function buscarClienteEVeiculos(req, res) {

  const cliente = await tabelaCliente.findOne({
    where: {
      cpf: req.params.cpf
    }
  })

  if (cliente != null) {

    const veiculo = await tabelaVeiculo.findAll({
      where: {
        cd_cliente: cliente.cd_cliente
      }
    })

    if (veiculo != null) {

      return res.status(200).json({
        success: true,
        cliente: cliente,
        veiculos: veiculo
      });

    } else {

      return res.status(400).json({
        success: false,
        codigo: 2,
        message: 'Não foi possível encontrar os veículos!'
      });
    }

  } else {

    return res.status(400).json({
      success: false,
      codigo: 1,
      message: 'Cliente não cadastrado!'
    });

  }

}

// Exportando função listarServicos
module.exports = buscarClienteEVeiculos;