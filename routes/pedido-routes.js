const { authJwt } = require("../middlewares");
const { upload } = require("../middlewares/");
const { service } = require("../middlewares/")
const serializer = require("../serializers/pedido-serializer")
const { mailer } = require("../helpers/");
const controller = require("../controllers/pedido-controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "accessToken, Origin, Content-Type, Accept"
    );
    next();
  });

  //Usuário Comum

  //Post
  
  //Insere um pedido, verificando se o usuário está logado e isnerindo um anexo.
  app.post("/pedido", [authJwt.validateToken], upload.single('file'), service, controller.adicionar, serializer, mailer.EnviaEmail)


  //Get

  //Meus pedidos (pegar pedido pelo req.user.nif => nif do usuário logado, que será verificado
  // pelo token jwt)
  app.get("/meusPedidos", [authJwt.validateToken], controller.meusPedidos, serializer)


  //PUT
  
  //rota para atualizar a avaliação
  app.put("/avaliacao/:id", [authJwt.validateToken], controller.alterarAvaliacao)


  //Gerentes --- (ADMIN)

  //Get

  //Buscar todos os pedidos
  app.get("/pedidos", [authJwt.validateToken, authJwt.isAdmin], controller.buscarTodos, serializer)

  //Buscar pedido por id do pedido
  app.get("/pedido/:id", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorIdPedido, serializer)

  //Buscar pedido por id da tabela det_pedido (foreignkey)
  app.get("/pedido/detalheid/:id", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorIdDetalhe, serializer)

  //Buscar pedido por nif da tabela usuario (foreignKey)
  app.get("/pedido/nif/:nif", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorNif, serializer)

  //Exibe o pedido pelo seu titlo
  app.get("/pedido/titulo/:pedido", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorNome, serializer);

};