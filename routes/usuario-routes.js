const { authJwt } = require("../middlewares");
const controller = require("../controllers/usuario-controller");
const upload = require("../middlewares/uploadImage");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "accessToken, Origin, Content-Type, Accept"
    );
    next();
  });

  //GET

  //Exibe as informações basicas do usuário logado (autenticado pelo jwt)
  app.get("/myUser", [authJwt.validateToken], controller.informacoesBasicas);


  //Delete

  //Deleta as informações do usuário logado (autenticado pelo jwt)
  app.delete('/myUser', [authJwt.validateToken], controller.excluirPorNif);


  //PUT

  //Altera as informações do usuário logado (autenticado pelo jwt) => Faz upload e atualiza imagem do usuário
  app.put('/myUser', upload.single('imagem'), [authJwt.validateToken], controller.alterarPorNif);

  //Rota para atualizar a senha
  app.put("/changePassword", [authJwt.validateToken], controller.mudarSenha);
  
};