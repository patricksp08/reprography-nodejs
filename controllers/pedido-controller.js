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


    //EXEMPLO ->
    // it('should create data for BelongsTo relations with alias', async function () {
    //     const Product = this.sequelize.define('Product', {
    //       title: Sequelize.STRING
    //     });
    //     const User = this.sequelize.define('User', {
    //       first_name: Sequelize.STRING,
    //       last_name: Sequelize.STRING
    //     });

    //     const Creator = Product.belongsTo(User, { as: 'creator' });

    //     await this.sequelize.sync({ force: true });

    //     const savedProduct = await Product.create(
    //       {
    //         title: 'Chair',
    //         creator: {
    //           first_name: 'Matt',
    //           last_name: 'Hansen'
    //         }
    //       },
    //       {
    //         include: [Creator]
    //       }
    //     );

    //     const persistedProduct = await Product.findOne({
    //       where: { id: savedProduct.id },
    //       include: [Creator]
    //     });


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
        const pedidos = await this.models.pedido.findAll({
            where: {
                
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

        // const novoDetalhePedido = await this.models.detalhePedido.create({
        //     id_pedido: 1,

        // })


        //Criando pedido
        // this.models.pedido.sequelize.query("SET foreign_key_checks = 0;", null);
        // this.models.det_pedido.sequelize.query("SET foreign_key_checks = 0;", null);
        // this.models.usuario.sequelize.query("SET foreign_key_checks = 0;", null);

        const novoPedido = await this.models.pedido.create({
            id_centro_custos: 1,
            nif: 34343,
            titulo_pedido: 'titulo_pedido',
            custo_total: 6366,
            id_modo_envio: 1,
            id_avaliacao_pedido: 3,
            id_curso: 2,
            observacoes: 'nenhudsdsma',
            id_acabamento: 2,
            det_pedidos: {
                id_pedido: 1,
                num_copias: 2,
                num_paginas: 1,
                id_tipos_copia: 2,
                id_acabamento: 2,
                id_tamanho: 1,
                id_tipos_capa: 2,
                sub_total_copias: 234
            }
        },
        {
            include: ['det_pedidos'] 
        },
        {
            include: ['nif_usuario']
        }
        );
        res.status(200).json({ message: "Pedido realizado com sucesso" });
    }
}

module.exports = PedidoController;