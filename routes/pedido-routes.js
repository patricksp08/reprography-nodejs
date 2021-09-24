const { validateToken } = require("../middlewares/AuthMiddleware");
const controller = require("../controllers/pedido-controller");

module.exports = function (app) {
  //Get

  //Buscar todos os pedidos
  app.get("/pedidos", controller.buscarTodos)

  //Buscar pedido por id do pedido
  app.get("/pedido/:id", controller.buscarPorIdPedido)

  //Buscar pedido por id da tabela det_pedido (foreignkey)
  app.get("/pedido/detalheid/:id", controller.buscarPorIdDetalhe)

  //Buscar pedido por nif da tabela usuario (foreignKey)
  app.get("/pedido/nif/:nif", controller.buscarPorNif)

  //Post
  app.post("/pedido", controller.adicionar)
};