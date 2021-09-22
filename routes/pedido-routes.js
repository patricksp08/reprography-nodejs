const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

//Instanciando Controller
const PedidoController = require("../controllers/pedido-controller");

const pedidoController = new PedidoController();


//Get

router.get("/", (req, res) => {
  pedidoController.buscarTodos(req,res);
})

router.get("/:id", (req, res) => {
  pedidoController.buscarPorId(req,res);
})

router.get("/nif/:nif", (req, res) => {
  pedidoController.buscarPorNif(req,res);
})


//Post
router.post("/", (req, res) => {
  pedidoController.adicionar(req,res);
})

module.exports = router;