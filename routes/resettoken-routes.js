const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5b237201069e7c",
    pass: "af6e47d7d723cc"
  }
});

//GET
router.get('/forgot-password', function(req, res, next) {
  res.render('usuario/forgot-password', { });
});

router.get('/reset-password', async function(req, res, next) {
  /**
   * Este código limpa todos os tokens expirados. 
   * Vocêdeve mover isso para um cronjob, se você tem um
   * grande site. Nós apenas incluímos isso aqui como um
   demonstração.
   **/
  await ResetToken.destroy({
    where: {
      expiration: { [Op.lt]: Sequelize.fn('CURDATE')},
    }
  });
 
  //Encontrando o token
  var record = await ResetToken.findOne({
    where: {
      email: req.query.email,
      expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
      token: req.query.token,
      used: 0
    }
  });
 
  if (record == null) {
    return res.render('usuario/reset-password', {
      message: 'Token expirado. Por favor, tente resetar sua senha novamente.',
      showForm: false
    });
  }
 
  res.render('usuario/reset-password', {
    showForm: true,
    record: record
  });
});




//POST
router.post('/forgot-password', async function(req, res, next) {
    //Assegure que você tem um usuário com esse email
    var email = await User.findOne({where: { email: req.body.email }});
    if (email == null) {
    /**
     * Nós não queremos avisar á atacantes
     * sobre emails que não existem, porque
     * dessa maneira, facilita achar os existentes.
     **/
      return res.json({status: 'ok'});
    }
    /**
     * Expira todos os tokens que foram definidos 
     * anteriormente para este usuário. Isso preveni
     * que tokens antigas sejam usadas.
     **/
    await ResetToken.update({
        used: 1
      },
      {
        where: {
          email: req.body.email
        }
    });
   
    //Cria um resete de token aleatório
    var fpSalt = crypto.randomBytes(64).toString('base64');
   
    //token expira depois de uma hora
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1/24);
   
    //Inserindo dados da token dentro do BD
    await ResetToken.create({
      email: req.body.email,
      expiration: expireDate,
      token: token,
      used: 0
    });
   
    //Menssagem enviada para o email
    const message = {
        from: 'Adm <953212ad5c-38952e@inbox.mailtrap.io>',
        to: req.body.email,
        replyTo: process.env.REPLYTO_ADDRESS,
        subject: process.env.FORGOT_PASS_SUBJECT_LINE,
        text: 'Para resetar sua senha, por favor clique no link abaixo.\n\nhttps://'+process.env.DOMAIN+'/user/reset-password?token='+encodeURIComponent(token)+'&email='+req.body.email
    };
   
    //Envia o email
    transport.sendMail(message, function (err, info) {
       if(err) { console.log(err)}
       else { console.log(info); }
    });
   
    return res.json({status: 'ok'});
  });

  //
  router.post('/reset-password', async function(req, res, next) {
    //comparar senhas
    if (req.body.password1 !== req.body.password2) {
      return res.json({status: 'error', message: 'Senha não encontrada. Por favor, tente novamente.'});
    }
   
    /**
    * Assegure que sua senha é válida (isValidPassword
    * function checa se sua senha tem >= 8 caracteres, alfanumerico,
    * caracter especial, etc)
    **/
    if (!isValidPassword(req.body.password1)) {
      return res.json({status: 'error', message: 'Senha não contêm os requerimentos minímos. Por favor, tente novamente.'});
    }
   
    var record = await ResetToken.findOne({
      where: {
        email: req.body.email,
        expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
        token: req.body.token,
        used: 0
      }
    });
   
    if (record == null) {
      return res.json({status: 'error', message: 'Token não encontrado. Por favor, faça o processo de resetar a senha novamente.'});
    }
   
    var upd = await ResetToken.update({
        used: 1
      },
      {
        where: {
          email: req.body.email
        }
    });
   
    var newSalt = crypto.randomBytes(64).toString('hex');
    var newPassword = crypto.pbkdf2Sync(req.body.password1, newSalt, 10000, 64, 'sha512').toString('base64');
   
    await usuario.update({
      senha: newPassword,
      salt: newSalt
    },
    {
      where: {
        email: req.body.email
      }
    });
   
    return res.json({status: 'ok', message: 'Senha resetada. Por favor, tente efetuar o login com sua nova senha'});
  });