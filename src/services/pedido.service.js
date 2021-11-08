//Biblioteca do sequelize 
const Sequelize = require("sequelize");
//Operadores do sequelize
const Op = Sequelize.Op;

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { pedido, servico_pedido } = initModels(sequelize)

module.exports = {

    //Buscar todos os pedidos da tabela pedido
    findAllRated: async (rated) => {
        var pedidos = await pedido.findAll(
            {
                where: {
                    id_avaliacao_pedido: {
                        [Op.or]: rated
                    }
                },
                // include: ['det_pedidos', 'servico_pedidos']
            },
        );

        return pedidos;
    },

    //Buscar todos os pedidos da tabela pedido
    findAllRatedbyNif: async (nif, rated) => {
        var pedidos = await pedido.findAll({
            where: {
                nif: nif,
                id_avaliacao_pedido: {
                    [Op.or]: rated
                },
            },
            // include: ['det_pedidos', 'servico_pedidos']
        });

        return pedidos;
    },

    findByName: async (titulo) => {
        // const query = `%${req.query.search}`;
        var pedidos = await pedido.findAll({
            where: {
                titulo_pedido: {
                    [Op.like]: `${titulo}%`
                }
            },
            // include: ['det_pedidos', 'servico_pedidos']
        });

        return pedidos;
    },

    //Todos os pedidos feito por tal pessoa (nif)
    findByPk: async (id) => {
        var pedidos = await pedido.findByPk(id)
        // include: ['det_pedidos', 'servico_pedidos']

        return pedidos;
    },

    //Adicionar pedido com detalhe solicitado por nif (usuario)
    pedidoCreate: async ({ param }) => {
        //Inserindo um pedido e seus detalhes/serviços:
        var pedidoCreated = await pedido.create(param, { include: ['det_pedidos', 'nif_usuario'] });

        return pedidoCreated;
    },

    tableMidCreate: async ({ param }) => {
        var tableMidCreated = await servico_pedido.create(param);

        return tableMidCreated;
    },

    updateRequest: async ({ request, param }) => {
        var pedidoUpdated = await request.update(param);

        return pedidoUpdated;
    },
};