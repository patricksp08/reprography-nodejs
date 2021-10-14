var transport = require("../helpers/mailer.js")
const mailer = require('../.config/mailer.config');
const { pedidoEmail } = require("../helpers/emailTemplates")
const { forgotPasswordEmail } = require("../helpers/emailTemplates")

exports.EnviaEmail = async (req) => {
    if (!req.token) {
        var { titulo_pedido, observacoes, num_copias, num_paginas, mail } = req.body;
        var { centro_custos, modo_envio, acabamento, tamanho_pagina, tipos_capa, curso, tipos_copia } = req;
        var nif = req.user.nif;

        var output = pedidoEmail(
            titulo_pedido, nif, centro_custos, curso, tipos_copia, tamanho_pagina, tipos_capa, 
            acabamento, num_paginas, num_copias, modo_envio, observacoes
        )

        var message = {
            from: mailer.hotmail.auth.user,
            to: mailer.reproEmail,
            replyTo: process.env.REPLYTO_ADDRESS,
            subject: `Solicitação de Reprografia`,
            html: output,
            attachments: [
                {
                    filename: req.file.filename,
                    path: req.file.path
                }
            ],
            date: Date.now()
        }
    }
    else {
        token = req.token
        var output = forgotPasswordEmail(token, mail)
        var message = {
            from: mailer.hotmail.auth.user,
            to: mail,
            replyTo: process.env.REPLYTO_ADDRESS,
            subject: "Recuperação de Senha",
            html: output
        };
    }

    //Envia o email
    await transport.sendMail(message, function (err, info) {
        if (err) { console.log(err) }
        else { console.log(info); }
    });
}