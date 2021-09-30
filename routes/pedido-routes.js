const { authJwt } = require("../middlewares");
const controller = require("../controllers/pedido-controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "accessToken, Origin, Content-Type, Accept"
    );
    next();
  });
  
  //Get

  //Buscar todos os pedidos
  app.get("/pedidos", [authJwt.validateToken],controller.buscarTodos)

  //Buscar pedido por id do pedido
  app.get("/pedido/:id", [authJwt.validateToken],controller.buscarPorIdPedido)

  //Buscar pedido por id da tabela det_pedido (foreignkey)
  app.get("/pedido/detalheid/:id", [authJwt.validateToken],controller.buscarPorIdDetalhe)

  //Buscar pedido por nif da tabela usuario (foreignKey)
  app.get("/pedido/nif/:nif", [authJwt.validateToken], controller.buscarPorNif)

    //Exibe o usuarío por nome na tabela usuario (exemplo: host:porta/usuariox)
    app.get("/usuario/:pedido", [authJwt.validateToken], controller.buscarPorNome);

  //Post
  app.post("/pedido", [authJwt.validateToken], controller.adicionar)
};