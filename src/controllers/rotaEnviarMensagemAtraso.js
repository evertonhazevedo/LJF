/*Importação das tabelas*/
const cliente = require('../migrations/cliente');

/*Importação das bibliotecas*/
const twilio = require('twilio');
require('dotenv').config();

async function enviarMensagemAtraso(req, res) {

  let body = req.body;

  //Instanciando objeto client Twilio
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  await client.messages.create({

    body: `Ola ` + body.nome + `! Estamos passando rapidinho para te avisar que infelizmente seu veiculo ainda não esta pronto para retirada,

Porém, a boa notícia é que ele estará pronto nos próximos 30 minutos. Pode deixar que te avisamos assim que terminar. Att. Equipe LJF`,
    from: process.env.TWILIO_WHATS_APP,
    to: 'whatsapp:+55' + body.whatsapp

  }).then(function (mensagem) {

    return res.status(200).json({
      success: true,
      message: mensagem.sid
    });

  }).catch(function (error) {

    return res.status(400).json({
      success: false,
      message: 'Não possível enviar a mensagem. Motivo: ' + error
    });

  })
}

module.exports = enviarMensagemAtraso;