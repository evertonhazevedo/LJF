/*Importação das tabelas*/
const tabelaBaia = require('../migrations/baia');

/*Função para listar os serviços*/
async function recuperarBaia(req, res) {

  const baias = await tabelaBaia.findAll();

  if (baias != null) {

    return res.status(200).json({
      success: true,
      baias: baias
    });

  } else {
    return res.status(400).json({
      success: false,
      message: 'Não foi possível recuperar as baias!'
    });

  }

}

module.exports = recuperarBaia;