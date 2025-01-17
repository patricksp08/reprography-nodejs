//Arquivos de config
const config = require("../../config/auth.config");

//Services
const serviceUsuario = require("../services/usuario.service");
const serviceResetToken = require("../services/resetToken.service");

//Uitlizado para criptografar as senhas no banco de dados
const bcrypt = require("bcrypt");
//Usado para criar o token de reset aleatório
const crypto = require('crypto');

//Envio de e-mail
const template = require("../templates/emails");
const { mailer } = require("../../mailer/mailer");

module.exports = {

  // ROTAS POST

  forgotPasswordPost: async (req, res) => {
    //Assegure que você tem um usuário com esse email

    // const { mail } = req.body;
    var mail = req.body.mail;

    var email = await serviceUsuario.findOneByEmail(mail);
    if (email == null) {
      /**
       * Nós não queremos avisar á atacantes
       * sobre emails que não existem, porque
       * dessa maneira, facilita achar os existentes.
       **/
      return res.json({ status: 'ok' });
    }
    /**
     * Expira todos os tokens que foram definidos 
     * anteriormente para este usuário. Isso preveni
     * que tokens antigas sejam usadas.
     **/
    await serviceResetToken.updateByEmail(mail);

    //Cria um resete de token aleatório
    var token = crypto.randomBytes(64).toString('base64');

    //token expira depois de uma hora
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1 / 24);

    //Inserindo dados da token dentro do BD
    await serviceResetToken.addToken({
      param: {
        email: mail,
        expiration: expireDate,
        token: token,
        used: 0
      }
    })

    res.json({ status: 'ok' });

    //Envio de e-mail de recuperação de senha
    var output = template.forgotPasswordEmail(token, mail);
    var title = "Recuperação de Senha";
    await mailer.sendEmails(mail, title, output, { attachments: null });
    return;
  },



  //RESET PASSWORD 

  resetPassword: async (req, res) => {

    let { email, token, senha, senha2 } = req.body;

    //comparar senhas
    if (senha !== senha2) {
      return res.json({ status: 'error', message: 'Senha não encontrada. Por favor, tente novamente.' });
    }

    /**
    * Assegure que sua senha é válida (isValidPassword
    * function checa se sua senha tem >= 8 caracteres, alfanumerico,
    * caracter especial, etc)
    **/
    // if (!isValidPassword(req.body.password1)) {
    //   return res.json({ status: 'error', message: 'Senha não contêm os requerimentos minímos. Por favor, tente novamente.' });
    // }
    var record = await serviceResetToken.findOneByEmailandToken(email, token);
    // var record = await resettoken.findOne({
    //   where: {
    //     email: email,
    //     expiration: { [Op.gt]: Sequelize.fn('CURDATE') },
    //     token: token,
    //     used: 0
    //   }
    // });

    if (record == null) {
      return res.json({ status: 'error', message: 'Token não encontrado. Por favor, faça o processo de resetar a senha novamente.' });
    }

    await serviceResetToken.updateByEmail(email);

    const newPassword = await bcrypt.hash(senha, config.jwt.saltRounds);

    var usuario = await serviceUsuario.findOneByEmail(email);

    await serviceUsuario.updateUser({ user: usuario, param: { senha: newPassword } });

    return res.json({ status: 'ok', message: 'Senha resetada. Por favor, tente efetuar o login com sua nova senha' });
  },
};