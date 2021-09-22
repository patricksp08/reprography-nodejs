const Sequelize = require("sequelize");
const { initModels, pedido } = require("../models/init-models.js").initModels;
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, 
    { host: config.development.host, dialect: config.development.dialect }
);

class PedidoController {

    constructor() {
        
    }

    //Inicializando as models e recebendo nas configurando
    models = initModels(sequelize);



    //GET 

    //Buscar todos os pedidos da tabela pedido
    async buscarTodos(req, res) {

        const pedidos = await this.models.pedido.findAll({
            include: [
                'det_pedidos'
            ]
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
        res.status(200).json({ message: "Pedido realizado com sucesso" });
    }
}

module.exports = PedidoController;