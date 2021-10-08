const { authJwt } = require("../middlewares");
const controller = require("../controllers/pedido-controller");
const { uploadFile } = require("../middlewares/");

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
  app.get("/pedidos", [authJwt.validateToken, authJwt.isAdmin], controller.buscarTodos)

  //Buscar pedido por id do pedido
  app.get("/pedido/:id", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorIdPedido)

  //Buscar pedido por id da tabela det_pedido (foreignkey)
  app.get("/pedido/detalheid/:id", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorIdDetalhe)

  //Buscar pedido por nif da tabela usuario (foreignKey)
  app.get("/pedido/nif/:nif", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorNif)

  //Exibe o pedido pelo seu titlo
  app.get("/pedido/titulo/:pedido", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorNome);

  //Post
  app.post("/pedido", [authJwt.validateToken], uploadFile.single('file'), controller.adicionar)

};