const { pedido } = require("../models");
const express = require("express")
const router = express.Router();

class PedidoController {

    constructor() {

    }

    //GET 

    //Buscar todos os pedidos da tabela pedido
    async buscarTodos(req, res) {
        const pedidos = await pedido.findAll()
        console.log(pedidos)
        res.json(pedidos)
    }

    //Buscar os pedidos por ID do pedido
    async buscarPorId(req, res) {
        const pedidos = await pedido.findAll({
            where: {
                id_pedido: req.params.id
            }
        })
        console.log(pedidos)
        res.json(pedidos)
    }

    //Todos os pedidos feito por tal pessoa (nif)
    async buscarPorNif(req, res) {
        const { nif } = req.params;
        const pedidos = await pedido.findAll({
            where: {
                nif: nif
            }
        })
        res.json(pedidos);
    };


    //POST

    async adicionar(req, res) {
        let { centro_custos, dt_pedido,
            titulo_pedido, custo_total, modo_envio, avaliacao_pedido, curso, observacoes } = req.body;
        let nif = req.user.nif;
        usuario.create({
            id_centro_custos: centro_custos,
            dt_pedido: dt_pedido,
            nif: nif,
            titulo_pedido: titulo_pedido,
            custo_total: custo_total,
            id_modo_envio: modo_envio,
            id_avaliacao_pedido: avaliacao_pedido,
            id_curso: curso,
            observacoes: observacoes
        });
        res.status(200).json({ message: "Pedido realizado com sucesso" });
    }
}

module.exports = PedidoController;