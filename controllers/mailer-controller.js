var transport = require("../helpers/mailer.js")
const mailer = require('../.config/mailer.config');
const { pedidoEmail } = require("../helpers/emailTemplates")
const { forgotPasswordEmail } = require("../helpers/emailTemplates")

exports.EnviaEmail = async (req) => {
    if (!req.token) {
        var { centro_custos, titulo_pedido, modo_envio, curso, observacoes, num_copias,
            num_paginas, tipos_copia, acabamento, tamanho_pagina, tipos_capa, mail } = req.body
            
        var nif = req.user.nif;

        var output = pedidoEmail(
            nif, centro_custos, titulo_pedido, modo_envio, curso, observacoes, num_copias,
            num_paginas, tipos_copia, acabamento, tamanho_pagina, tipos_capa
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