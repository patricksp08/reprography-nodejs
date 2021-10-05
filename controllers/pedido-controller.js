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
    let { num_copias, num_paginas, tipos_copia, acabamento, tamanho_pagina, tipos_capa } = req.body

    var servicos = [];
    var sub_total_copias = 0;

//  //TESTE
//     if(tipos_capa && acabamento == 1 && 3) {
//         sub_total_copias += 99999
//         servicos.push(1)
//     }


    //Lógica para sub_total - Switch  

    // ** Switch com Lógica, fornecer no parâmetro os campos 
    // *** a serem comparados e seus casos abaixo:

    //Incremento de valores dependendo do serviços
    switch (tipos_copia && tamanho_pagina) {
        case '1' && '3':
            sub_total_copias += 0.06
            await servicos.push(1)
            break;

        case '1' && '2':
            sub_total_copias += 0.024
            await servicos.push(2)
            break;

        case '1' && '1':
            sub_total_copias += 0.15
            await servicos.push(3)
            break;

        case '2' && '2':
            sub_total_copias += 0.1
            await servicos.push(4)
            break;

        case '1' && '4' || '5':
            sub_total_copias += 0.3
            await servicos.push(5)
            break;

        default:
            sub_total_copias = 0
            break;
    };



    switch (tipos_capa && acabamento) {
        case '1' && '3':
            sub_total_copias += 0.07
            await servicos.push(6)
            break;

        case '1' && '2':
            sub_total_copias += 0.05
            await servicos.push(7)
            break;

        case '1' && '1':
            sub_total_copias += 0.5
            await servicos.push(8)
            break;

        case '2' && '2':
            sub_total_copias += 0.45
            await servicos.push(9)
            break;

        default:
            sub_total_copias = 0
            break;
    }


    //Inserindo um pedido e seus detalhes:

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
        servico.decrement(['quantidade'], {where: {id_servico: {
            [Op.or]: servicos
        }}} )
        servico.findAll({
            where: {
                id_servico: {
                    [Op.or]: servicos
                }

            }   
        })
        .then(servicos => {
            pedido.setServicos(servicos)
            // .then(roles => {
            // res.status(200).send("User was registered successfully!");
            // });
        });
    })
    res.status(200).json({ message: "Pedido realizado com sucesso" });
};