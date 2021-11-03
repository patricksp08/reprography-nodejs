const { authJwt } = require("../middlewares");
const { upload } = require("../middlewares/");
const { verifyService } = require("../middlewares/");
const { mailer } = require("../utils/");
const controller = require("../controllers/pedido.controller");
const serializer = require("../serializers/pedido.serializer");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "accessToken, Origin, Content-Type, Accept"
    );
    next();
  });

  ////USUARIO COMUM

  //POST

  //Insere um pedido, verificando se o usuário está logado e isnerindo um anexo.
  app.post("/request", [authJwt.validateToken], upload.single('file'), verifyService, controller.adicionar);


  //GET

  //Meus pedidos (pegar pedido pelo req.user.nif => nif do usuário logado, que será verificado
  // pelo token jwt)
  app.get("/myRequests", [authJwt.validateToken], controller.meusPedidos, serializer);


  //PUT

  //rota para atualizar a avaliação
  app.put("/rating/:id", [authJwt.validateToken], controller.alterarAvaliacao, serializer, mailer.EnviaEmail);


  ////ADMIN

  //GET

  //Buscar todos os pedidos
  app.get("/requests/rated=rated", [authJwt.validateToken, authJwt.isAdmin], controller.buscarTodos, serializer);

  //Buscar pedido por id do pedido
  app.get("/request/:id", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorIdPedido, serializer);

  //Buscar pedido por id da tabela det_pedido (foreignkey)
  app.get("/request/DetailId/:id", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorIdDetalhe, serializer);

  //Buscar pedido por nif da tabela usuario (foreignKey)
  app.get("/request/nif/:nif", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorNif, serializer);

  //Exibe o pedido pelo seu titlo
  app.get("/request/title/:pedido", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorNome, serializer);
};