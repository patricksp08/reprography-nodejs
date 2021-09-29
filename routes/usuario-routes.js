const { authJwt } = require("../middlewares");
const controller = require("../controllers/usuario-controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "accessToken, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //GET
  //Exibe todos os usuários da tabela usuario
  app.get("/usuarios", [authJwt.validateToken], controller.buscarTodos);

  //Exibe o usuarío por nome na tabela usuario (exemplo: host:porta/usuariox)
  app.get("/usuario/:user", [authJwt.validateToken], controller.buscarPorNome);

  //Exibe o usuarío por nif na tabela usuario (exemplo: host:porta/33321)
  app.get("/usuario/nif/:nif",[authJwt.validateToken], controller.buscarPorNif);


  //PUT
  //Rota para alterar um usuario da tabela usuario por ID
  app.put('/usuario/:nif', [authJwt.validateToken], controller.alterarPorNif);

  //Rota para atualizar a senha
  app.put("/changepassword", [authJwt.validateToken], controller.mudarSenha);

  //Delete
  //Rota para deletar um usuario da tabela usuario por nif
  app.delete('/usuario/:nif',[authJwt.validateToken], controller.excluirPorNif);
};