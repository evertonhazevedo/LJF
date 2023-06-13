/*Configurações*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_CONFIG = require('../config/jwtSecret');

/*Importação das tabelas*/
const tabelaUsuario = require('../migrations/usuario');

/*Função para validar login*/
  async function autenticarFuncionario(req, res) {

    const funcionario = await tabelaUsuario.findOne({
        attributes: ['cd_usuario', 'nome', 'sobrenome', 'email', 'senha', 'nm_usuario'],
        where: {
          nm_usuario: req.params.nm_usuario
        }
    });

    if (funcionario == null) {

        return res.status(400).json({
            success: false
        });

    } else {

        if (await bcrypt.compare(req.params.senha, funcionario.senha)) {

            let token = jwt.sign({ id: funcionario.cd_usuario }, JWT_CONFIG.acessoToken, {
                expiresIn: 1800 //30min
            });

            return res.status(200).json({
                success: true,
                funcionario: funcionario,
                token
            });

        } else {

            return res.status(400).json({
                success: false
            });

        }
    }

}

module.exports = autenticarFuncionario;