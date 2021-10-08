const nodemailer = require('nodemailer');
const mailer = require('../.config/mailer.config');

//Criando conexão SMTP
var mailConfig = {
    secureConnection: mailer.hotmail.secureConnection,
    service: mailer.hotmail.service,
    auth: {
        user: mailer.hotmail.auth.user,
        pass: mailer.hotmail.auth.pass
    },
    tls: {
        ciphers: mailer.hotmail.tls.ciphers
    }
};

var transport = nodemailer.createTransport(mailConfig)

module.exports = transport