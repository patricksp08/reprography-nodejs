const { mailer } = require("../helpers/")
const controller = require("../controllers/resetToken-controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "accessToken, Origin, Content-Type, Accept"
        );
        next();
    });

    //Get
    
    // app.get('/forgot-password', controller.forgotPasswordGet)

    //reset password  -> Este código limpa todos os tokens expirados.
    app.get('/resetarSenha', controller.resetTokenExpired)


    //Post

    //Enviar e-mail de recuperação e inserir email na tabela resetToken
    app.post('/esqueceuSenha', controller.forgotPasswordPost, mailer.EnviaEmail)

    //Criar senha nova para o usuário que resetou a senha pelo email
    app.post('/resetarSenha', controller.resetPassword)
    
};