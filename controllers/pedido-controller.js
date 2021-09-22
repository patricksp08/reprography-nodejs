<<<<<<< HEAD
const Sequelize  = require("sequelize");
const { pedido } = require("../models");
const { detalhePedido } = require("../models");
const { usuario } = require("../models")
=======
const Sequelize = require("sequelize");
const { initModels, pedido } = require("../models/init-models.js").initModels;
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, 
    { host: config.development.host, dialect: config.development.dialect }
);
>>>>>>> e804787b0918ff89ddb9649a5a76131acb5b5878

var initModels = require("../models/init-models").initModels; 
var config = require("../config/config");
var sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect
});
var models = initModels(sequelize)

<<<<<<< HEAD

class PedidoController {
    constructor() {
=======
    constructor() {
        
>>>>>>> e804787b0918ff89ddb9649a5a76131acb5b5878
    }

    //Inicializando as models e recebendo nas configurando
    models = initModels(sequelize);



    //GET 

    //Buscar todos os pedidos da tabela pedido


    async buscarTodos(req, res) {
<<<<<<< HEAD
        const pedidos = await models.pedido.findAll({include: 
        
            ['det_pedidos']
=======

        const pedidos = await this.models.pedido.findAll({
            include: [
                'det_pedidos'
            ]
>>>>>>> e804787b0918ff89ddb9649a5a76131acb5b5878
        })
        console.log(pedidos)
        res.json(pedidos)
    }

    //Buscar os pedidos por ID do pedido
    async buscarPorIdPedido(req, res) {
        const pedidos = await this.models.pedido.findByPk(req.params.id)
        console.log(pedidos)
        res.json(pedidos)
    }

    //Todos os pedidos feito por tal pessoa (nif)
    async buscarPorNif(req, res) {
        const { nif } = req.params;
        const pedidos = await this.models.pedido.findAll({
            where: {
                nif: nif
            }
        })
        res.json(pedidos);
    };

    async buscarPorIdDetalhe(req, res) {
        const { nif } = req.params;
        const pedidos = await this.models.pedido.findAll({
            where: {
                id_
            }
        })
        res.json(pedidos);
    };


    //POST

    async adicionar(req, res) {
        let { centro_custos, dt_pedido,
            titulo_pedido, custo_total, modo_envio, avaliacao_pedido, curso, observacoes, nif } = req.body;
        // let nif = req.user.nif;

<<<<<<< HEAD
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
=======

        //Criando acabamento
        const novoDetalhePedido = await this.models.detalhePedido.create({
            id_pedido: 1,

        })


        //Criando pedido
        await this.models.pedido.create({
            id_centro_custos: 1,
            nif: 1234,
            titulo_pedido: 'titulo_pedido',
            custo_total: 666,
            id_modo_envio: 4,
            id_avaliacao_pedido: 3,
            id_curso: 1,
            observacoes: 'nenhuma',
            id_acabamento: 2
            
        }).then(function(pedido){
            pedido.setdet_pedido([{}])
        })
>>>>>>> e804787b0918ff89ddb9649a5a76131acb5b5878
        res.status(200).json({ message: "Pedido realizado com sucesso" });
    }
}

module.exports = PedidoController;