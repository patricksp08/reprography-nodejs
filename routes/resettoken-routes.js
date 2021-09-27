const { validateToken } = require("../middlewares/authJwt");
const controller = require("../controllers/resetToken");

module.exports = function (app) {

    //Get

    app.get('/forgot-password', controller.forgotPasswordGet)

    //reset password  -> Este código limpa todos os tokens expirados.
    app.get('/reset-password', controller.resetTokenExpired)


    //Post

    //Enviar e-mail de recuperação e inserir email na tabela resetToken
    app.post('/forgot-password', controller.forgotPasswordPost)

    //Criar senha nova para o usuário que resetou a senha pelo email
    app.post('/reset-password', controller.resetPassword)

};