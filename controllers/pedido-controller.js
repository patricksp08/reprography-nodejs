const Sequelize = require("sequelize")
const Op = Sequelize.Op;


//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { pedido, det_pedido, servico } = initModels(sequelize)

//Usado para enviar o email (serviço SMTP)


module.exports = {

    ////GET 

    //Buscar todos os pedidos da tabela pedido
    buscarTodos: async (req, res) => {
        const pedidos = await pedido.findAll(
            {
                include: ['det_pedidos', 'servicos']
            },
        );
        res.json(pedidos)
        //pedido 1
        // id_tipos_copia 3 => PRETO BRANCOP
        // id_curso 1 => TEC,.,


    },

    buscarPorNome: async (req, res) => {
        const pedidoParam = req.params.pedido;
        // const query = `%${req.query.search}`;
        const pedidos = await pedido.findAll({
            where: {
                titulo_pedido: {
                    [Op.like]: `${pedidoParam}%`
                }
            },
            include: [
                'det_pedidos'
            ]
        });
        pdsa    
    },

    //Buscar os pedidos por ID do pedido
    buscarPorIdPedido: async (req, res) => {
        const pedidos = await pedido.findByPk(req.params.id, {
            include: [
                'det_pedidos'
            ]
        });
        res.json(pedidos)
    },

    //Todos os pedidos feito por tal pessoa (nif)
    buscarPorNif: async (req, res) => {
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
    },

    //Buscar por detalhe do ID
    buscarPorIdDetalhe: async (req, res) => {
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
    },

    //Usuário Comum 

    //GET

    //Todos os pedidos feito pelo usuário LOGADO!
    meusPedidos: async (req, res) => {
        const pedidos = await pedido.findAll({
            where: {
                nif: req.user.nif
            },
            include: [
                'det_pedidos'
            ]
        });
        res.json(pedidos);
    },

    //POST

    //Adicionar pedido com detalhe solicitado por nif (usuario)
    adicionar: async (req, res, next) => {
        //Input que será enviado para tabela Pedido
        let { centro_custos, titulo_pedido, modo_envio, curso } = req.body;

        // Input que será enviado para tabela Det_Pedido
        let { num_copias, num_paginas, tipos_copia, acabamento, tamanho_pagina, tipos_capa, observacoes } = req.body

        //Inserindo um pedido e seus detalhes/serviços:
        await pedido.create({
            id_centro_custos: centro_custos,
            nif: req.user.nif,
            titulo_pedido: titulo_pedido,
            custo_total: [(num_copias * num_paginas) * req.sub_total],
            id_modo_envio: modo_envio,
            id_avaliacao_pedido: 0,
            id_curso: curso,
            avaliacao_obs: "Ainda não avaliado",
            det_pedidos: {
                // id_pedido: 1,
                num_copias: num_copias,
                num_paginas: num_paginas,
                id_tipos_copia: tipos_copia,
                id_acabamento: acabamento,
                id_tamanho: tamanho_pagina,
                id_tipos_capa: tipos_capa,
                observacoes: observacoes,
                sub_total_copias: req.sub_total
            },
        },
            {
                include: ['det_pedidos']
            },
            {
                include: ['nif_usuario']
            }
        ).then(pedido => {
            servico.decrement({ quantidade: +(num_copias * num_paginas) }, {
                where: {
                    id_servico: {
                        [Op.or]: req.servicos
                    }
                }
            });
            servico.findAll({
                where: {
                    id_servico: {
                        [Op.or]: req.servicos
                    }
                }
            }).then(servicos => {
                pedido.setServicos(servicos)
                // .then(roles => {
                // res.status(200).send("User was registered successfully!");
                // });
            });
        })
        res.json({ message: "Pedido realizado com sucesso!" })
        next();
    },


    //PUT

    alterarAvaliacao: async (req, res) => {
        var { id_avaliacao_pedido, avaliacao_obs } = req.body

        await pedido.update(
            { id_avaliacao_pedido, avaliacao_obs },
            {
                where: { id_pedido: req.params.id },
            }
        )
        res.status(200).json({ message: `Avaliação do pedido ${req.params.id} atualizada com sucesso!` });
    }
}