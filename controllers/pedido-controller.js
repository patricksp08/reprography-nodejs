const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { pedido, det_pedido, servico } = initModels(sequelize)

//Usado para enviar o email (serviço SMTP)


module.exports = {

    ////GET 

    //Buscar todos os pedidos da tabela pedido
    buscarTodos: async (req, res, next) => {
        var pedidos = await pedido.findAll(
            {
                include: ['det_pedidos', 'servicos']
            },
        );
        if (pedidos.length < 1) {
            return res.json({ message: "Nenhum pedido encontrado!" })
        }
        req.pedidos = pedidos
        next();
    },

    buscarPorNome: async (req, res, next) => {
        const pedidoParam = req.params.pedido;
        // const query = `%${req.query.search}`;
        var pedidos = await pedido.findAll({
            where: {
                titulo_pedido: {
                    [Op.like]: `${pedidoParam}%`
                }
            },
            include: ['det_pedidos', 'servicos']
        });
        if (pedidos.length < 1 ) {
            return res.json({ message: "Nenhum pedido encontrado!" })
        }
        req.pedidos = pedidos
        next();
    },

    //Buscar os pedidos por ID do pedido
    buscarPorIdPedido: async (req, res, next) => {
        const { id } = req.params;
        var pedidos = await pedido.findAll({
            where: {
               id_pedido: id
            },
            include: ['det_pedidos', 'servicos']
        });
        if (pedidos.length < 1) {
            return res.json({ message: "Nenhum pedido encontrado!" })
        }
        req.pedidos = pedidos
        next();
    },

    //Todos os pedidos feito por tal pessoa (nif)
    buscarPorNif: async (req, res, next) => {
        const { nif } = req.params;
        var pedidos = await pedido.findAll({
            where: {
                nif: nif
            },
            include: ['det_pedidos', 'servicos']
        });
        if (pedidos.length < 1) {
            return res.json({ message: "Nenhum pedido encontrado!" })
        }
        req.pedidos = pedidos
        next();
    },

    //Buscar por detalhe do ID
    buscarPorIdDetalhe: async (req, res, next) => {
        var pedidos = await pedido.findAll({
            include: {
                model: det_pedido,
                as: "det_pedidos",
                where: {
                    id_det_pedido: req.params.id
                },
     
            },
            include: ['det_pedidos', 'servicos']
        });
        if (pedidos.length < 1) {
            return res.json({ message: "Nenhum pedido encontrado!" })
        }
        req.pedidos = pedidos
        next();
    },

    //Usuário Comum 

    //GET

    //Todos os pedidos feito pelo usuário LOGADO!
    meusPedidos: async (req, res, next) => {
        var pedidos = await pedido.findAll({
            where: {
                nif: req.user.nif
            },
            include: [
                'det_pedidos'
            ]
        });
        if (pedidos.length < 1) {
            return res.json({ message: "Nenhum pedido encontrado!" })
        }
        req.pedidos = pedidos
        next();
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
            avaliacao_obs: null,
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