const express = require("express");
const router = express.Router();
const { pedidos } = require("../models");

router.get("/:pedido", async (req, res ) => {
    pedido = req.params.pedido
  const pedidos = await pedidos.findAll({where: {
    id_pedido: `${pedido}`
  }})
    console.log(pedidos)
    res.json(pedidos)
  })

module.exports = router;