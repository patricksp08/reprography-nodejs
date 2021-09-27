const { sequelize } = require("../models/")
const { initModels } = require("../models/init-models.js");

////Inicializando as models e recebendo nas configurando
var models = initModels(sequelize);
var { pedido } = models

////GET 

//Buscar todos os pedidos da tabela pedido
exports.buscarTodos = async (req, res) => {
    const pedidos = await pedido.findAll({
        include: [
            'det_pedidos'
        ]
    })
    console.log(pedidos)
    res.json(pedidos)
}

//Buscar os pedidos por ID do pedido
exports.buscarPorIdPedido = async (req, res) => {
    const pedidos = await pedido.findByPk(req.params.id)
    console.log(pedidos)
    res.json(pedidos)
}

//Todos os pedidos feito por tal pessoa (nif)
exports.buscarPorNif = async (req, res) => {
    const { nif } = req.params;
    const pedidos = await pedido.findAll({
        where: {
            nif: nif
        },
        include: [
            'det_pedidos'
        ]
    })
    res.json(pedidos);
};

//Buscar por detalhe do ID
exports.buscarPorIdDetalhe = async (req, res) => {
    const pedidos = await pedido.findAll({
        include: {
            model: models.det_pedido,
            as: "det_pedidos",
            where: {
                id_det_pedido: req.params.id
            },
        },
    })
    res.json(pedidos);
};

//POST

//Adicionar pedido com detalhe solicitado por nif (usuario)
exports.adicionar = async (req, res) => {
    let { centro_custos,
        titulo_pedido, custo_total, modo_envio, avaliacao_pedido, curso, observacoes, nif } = req.body;

    let { num_copias, num_paginas, tipos_copia, acabamento, tamanho, tipos_capa, sub_total_copias } = req.body
    //Lógica para sub_total - Switch

    //Lógica para custo total

    await pedido.create({
        id_centro_custos: centro_custos,
        nif: nif,
        titulo_pedido: titulo_pedido,
        custo_total: custo_total,
        id_modo_envio: modo_envio,
        id_avaliacao_pedido: avaliacao_pedido,
        id_curso: curso,
        observacoes: observacoes,
        id_acabamento: 2,
        det_pedidos: {
            // id_pedido: 1,
            num_copias: num_copias,
            num_paginas: num_paginas,
            id_tipos_copia: tipos_copia,
            id_acabamento: acabamento,
            id_tamanho: tamanho,
            id_tipos_capa: tipos_capa,
            sub_total_copias: sub_total_copias
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