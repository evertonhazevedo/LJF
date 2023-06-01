/*Importação das tabelas*/
const tabelaServico = require('../migrations/servico');

/*Função para listar os serviços*/
async function listarServicos(req, res) {

  const servicos = await tabelaServico.findAll();

  if (servicos != null) {
    return res.status(200).json({
      success: true,
      servicos: servicos
    });

  } else {
    return res.status(400).json({
      success: false,
      message: 'Não foi possível recuperar os serviços!'
    });

  }

}

// Exportando função listarServicos
module.exports = listarServicos;