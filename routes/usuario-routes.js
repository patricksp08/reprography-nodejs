const { validateToken } = require("../middlewares/authJwt");
const controller = require("../controllers/usuario-controller");

module.exports = function (app) {

  //GET
  //Exibe todos os usuários da tabela usuario
  app.get("/usuarios", controller.buscarTodos);

  //Exibe o usuarío por nome na tabela usuario (exemplo: host:porta/usuariox)
  app.get("/usuario/:user", controller.buscarPorNome);

  //Exibe o usuarío por nif na tabela usuario (exemplo: host:porta/33321)
  app.get("/usuario/nif/:nif", controller.buscarPorNif);

  //Rota para verificar se o usuário está logado (validateToken do Middleware AuthMiddleware)
  app.get("/auth", validateToken, (req, res) => {
    res.json(req.userId);
  });

  //PUT
  //Rota para alterar um usuario da tabela usuario por ID
  app.put('/usuario/:nif', controller.alterarPorNif);

  //Rota para atualizar a senha
  app.put("/changepassword", validateToken, controller.mudarSenha);

  //Delete
  //Rota para deletar um usuario da tabela usuario por nif
  app.delete('/usuario/:nif', controller.excluirPorNif);
};