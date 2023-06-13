// Importação da tabela baia
const tabelaBaia = require("../migrations/baia");

// Criando função para cadastrar baia
async function cadastrarBaia(req, res) {

  // Recuperando dados do formulário
  const corpo = req.body;

  try {
    // Criar um array de baias para inserir no banco de dados

    for (let i = 0; i < corpo.quantidadeBaias; i++) {
      await tabelaBaia.create({
        status: 0
      });
    }

    // Baia cadastrada com sucesso
    return res.status(200).json({
      success: true,
      mensagem: 'Baias cadastradas com sucesso'
    });
  } catch (error) {
    // Erro ao cadastrar
    return res.status(400).json({
      success: false,
      codigo: '02',
      message: 'Não foi possível cadastrar a baia: ' + error.message
    });
  }
}

// Exportando função cadastrar baia
module.exports = cadastrarBaia;
