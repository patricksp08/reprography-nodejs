const Sequelize = require("sequelize")
const Op = Sequelize.Op;

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { pedido, det_pedido, servico } = initModels(sequelize)


////GET 


//Buscar todos os pedidos da tabela pedido
exports.buscarTodos = async (req, res) => {
    const pedidos = await pedido.findAll(
        {
            include: ['det_pedidos', 'servicos']
        },
    );
    console.log(pedidos)
    res.json(pedidos)
}

exports.buscarPorNome = async (req, res) => {
    const user = req.params.user;
    // const query = `%${req.query.search}`;
    let pedidos = await pedido.findAll({
        where: {
            nome: {
                [Op.like]: `${user}%`
            }
        },
        include: [
            'det_pedidos'
        ]
    });
    console.log(pedidos)
    res.json(pedidos)
}

//Buscar os pedidos por ID do pedido
exports.buscarPorIdPedido = async (req, res) => {
    const pedidos = await pedido.findByPk(req.params.id, {
        include: [
            'det_pedidos'
        ]
    });
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
    });
    res.json(pedidos);
};

//Buscar por detalhe do ID
exports.buscarPorIdDetalhe = async (req, res) => {
    const pedidos = await pedido.findAll({
        include: {
            model: det_pedido,
            as: "det_pedidos",
            where: {
                id_det_pedido: req.params.id
            },
        },
    });
    res.json(pedidos);
};

//POST

//Adicionar pedido com detalhe solicitado por nif (usuario)
exports.adicionar = async (req, res) => {
    //Input que será enviado para tabela Pedido
    let { centro_custos, titulo_pedido, custo_total, modo_envio, avaliacao_pedido, curso, observacoes } = req.body;

    // Input que será enviado para tabela Det_Pedido
    let { num_copias, num_paginas, tipos_copia, acabamento, tamanho_pagina, tipos_capa, sub_total_copias } = req.body


    //Lógica para sub_total - Switch  


    // *** -------- (pensar se total é realmente necessário...) --------------
    // ** Switch com Lógica, fornecer no parâmetro os campos 
    // *** a serem comparados e seus casos abaixo:

    //Guardando valores para definir um limite (Usar limite por valores ou solicitações?)

    //  var {serv1, serv2, serv3, serv4, serv5 } = null;

    // if (serv1 > 900){
    //     return null
    // }
    // if (serv2 > 96000){
    //     return null
    // }
    // if (serv3 > 600){
    //     return null
    // }
    // if (serv4 > 400){
    //     return null
    // }
    // if (serv5 > 30){
    //     return null
    // }

    //Lógica a ser utilizada ?
    // switch (x) {
    //     case 1:
    //         tipos_copia = 1
    //         tamanho_pagina = 3
    //         sub_total_copias += 0.0600

    //         break;

    //Incremento de valores dependendo do serviços
    // switch (tipos_copia && tamanho_pagina) {
    //     case 1 && 3:
    //         sub_total_copias += 0.0600 
    //         serv1 += 0.0600 
    //         break;

    //     case 1 && 2:
    //         sub_total_copias += 0.0240
    //         break;

    //     case 1 && 1:
    //         sub_total_copias += 0.1500
    //         break;

    //     case 2 && 2:
    //         sub_total_copias += 0.1000
    //         break;

    //     default:
    //         sub_total_copias = 0
    //         break;
    // };


    //Reduzidas ou amplidas Preto e Branco
    //    if(redAmpl === 1 || 2 && tipos_copia === 1 ){
    //     sub_total_copias = 0.3000
    //    }

    //
    // switch (tipos_capa && acabamento) {
    //     case 1 && 3:
    //         sub_total_copias += 0.0700
    //         break;

    //     case 1 && 2:
    //         sub_total_copias += 0.0500
    //         break;

    //     case 1 && 1:
    //         sub_total_copias += 0.5000
    //         break;

    //     case 2 && 2:
    //         sub_total_copias += 0.4500
    //         break;

    //     default:
    //         sub_total_copias = 0
    //         break;
    // }


    //Lógica para custo total

    await pedido.create({
        id_centro_custos: centro_custos,
        nif: req.user.nif,
        titulo_pedido: titulo_pedido,
        custo_total: custo_total,
        id_modo_envio: modo_envio,
        id_avaliacao_pedido: avaliacao_pedido,
        id_curso: curso,
        observacoes: observacoes,
        det_pedidos: {
            // id_pedido: 1,
            num_copias: num_copias,
            num_paginas: num_paginas,
            id_tipos_copia: tipos_copia,
            id_acabamento: acabamento,
            id_tamanho: tamanho_pagina,
            id_tipos_capa: tipos_capa,
            sub_total_copias: sub_total_copias
        },
    },
        {
            include: ['det_pedidos']
        },
        {
            include: ['nif_usuario']
        }
    ).then(pedido => {
        servico.findAll({
            where: {
                id_servico: 
                   req.body.servicos
                
            }
        }).then(servicos => {
            pedido.setServicos(servicos)
            // .then(roles => {
            // res.status(200).send("User was registered successfully!");
            // });
            

        });
    })
    res.status(200).json({ message: "Pedido realizado com sucesso" });
};