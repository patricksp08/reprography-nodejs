const Sequelize  = require("sequelize");
const { pedido } = require("../models");
const { detalhePedido } = require("../models");
const { usuario } = require("../models")

var initModels = require("../models/init-models").initModels; 
var config = require("../config/config");
var sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect
});
var models = initModels(sequelize)


class PedidoController {
    constructor() {
    }

    //GET 

    //Buscar todos os pedidos da tabela pedido


    async buscarTodos(req, res) {
        const pedidos = await models.pedido.findAll({include: 
        
            ['det_pedidos']
        })
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
            titulo_pedido, custo_total, modo_envio, avaliacao_pedido, curso, observacoes, nif } = req.body;
        // let nif = req.user.nif;

        let { num_copias, num_paginas, id_tipos_copia, id_acabamento, id_tamanho, id_tipos_capa, sub_total_copias} = req.body;
        await pedido.sequelize.query("SET foreign_key_checks = 0;", null);
        //Criando pedido
        // const novoPedido = await pedido.create({
        //     id_centro_custos: 2,
        //     dt_pedido: 2,
        //     nif: 12314,
        //     titulo_pedido: 'seila',
        //     custo_total: 12345,
        //     id_modo_envio: 2,
        //     id_avaliacao_pedido: 'avalia',
        //     id_curso: 2,
        //     observacoes: 'nao tem', 
        // });
        //Criando o detalhe do pedido
        const novoDetalhePedido = await detalhePedido.create({
            id_pedido: 1,
            num_copias: 2,
            num_paginas: 2,
            id_tipos_copia: 2,
            id_acabamento: 2,
            id_tamanho: 2,
            id_tipos_capa: 2,
            sub_total_copias: 2
        }) 
        res.status(200).json({ message: "Pedido realizado com sucesso" });
    }
}

module.exports = PedidoController;