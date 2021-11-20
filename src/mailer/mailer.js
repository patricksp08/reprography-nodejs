const nodemailer = require('nodemailer');
const mailer = require('../config/').mailerConfig;

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

var transport = nodemailer.createTransport(mailConfig);

exports.sendEmails = async (email, title, output, { attachments }) => {

    var message = {
        from: mailer.hotmail.auth.user,
        to: email,
        replyTo: process.env.REPLYTO_ADDRESS,
        subject: title,
        html: output,
        attachments: attachments,
        date: Date.now()
    };
    //Envia o email
    await transport.sendMail(message, function (err, info) {
        if (err) { console.log(err) }
        else { console.log(info); }
    });
};