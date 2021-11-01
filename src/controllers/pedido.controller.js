const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { pedido, det_pedido, servico_pedido, servicoCapaAcabamento, servicoCopiaTamanho } = initModels(sequelize)
const verifyService  = require("../middlewares/service")
module.exports = {

    ////ADMIN

    //GET 

    //Buscar todos os pedidos da tabela pedido
    buscarTodos: async (req, res, next) => {
        var pedidos = await pedido.findAll(
            {
                include: ['det_pedidos', 'servico_pedidos']
            },
        );
        if (pedidos.length < 1) {
            return res.json({ message: "Nenhum pedido encontrado!" })
        }
        req.pedidos = pedidos
        next();
    },

    buscarPorNome: async (req, res, next) => {
        // const query = `%${req.query.search}`;
        var pedidos = await pedido.findAll({
            where: {
                titulo_pedido: {
                    [Op.like]: `${req.params.pedido}%`
                }
            },
            include: ['det_pedidos', 'servico_pedidos']
        });
        if (pedidos.length < 1) {
            return res.json({ message: "Nenhum pedido encontrado!" })
        }
        req.pedidos = pedidos
        next();
    },

    //Buscar os pedidos por ID do pedido
    buscarPorIdPedido: async (req, res, next) => {
        var pedidos = await pedido.findAll({
            where: {
                id_pedido: req.params.id
            },
            include: ['det_pedidos', 'servico_pedidos']
        });
        if (pedidos.length < 1) {
            return res.json({ message: "Nenhum pedido encontrado!" })
        }
        req.pedidos = pedidos
        next();
    },

    //Todos os pedidos feito por tal pessoa (nif)
    buscarPorNif: async (req, res, next) => {
        var pedidos = await pedido.findAll({
            where: {
                nif: req.params.nif
            },
            include: ['det_pedidos', 'servico_pedidos']
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
            include: ['det_pedidos', 'servico_pedidos']
        });
        if (pedidos.length < 1) {
            return res.json({ message: "Nenhum pedido encontrado!" })
        }
        req.pedidos = pedidos
        next();
    },


    ////Usuário Comum 

    //GET

    //Todos os pedidos feito pelo usuário LOGADO!
    meusPedidos: async (req, res, next) => {
        var pedidos = await pedido.findAll({
            where: {
                nif: req.user.nif
            },
            include: ['det_pedidos', 'servico_pedidos']
        });
        if (pedidos.length < 1) {
            return res.json({ message: "Nenhum pedido encontrado!" })
        }
        res.json(pedidos)
    },

    //POST


    //Adicionar pedido com detalhe solicitado por nif (usuario)
    adicionar: async (req, res, next) => {
        //Input que será enviado para tabela Pedido
        const { centro_custos, titulo_pedido, modo_envio, curso } = req.body;

        // Input que será enviado para tabela Det_Pedido
        const { num_copias, num_paginas, servicoCT, servicoCA, observacoes } = req.body

        var custo_total = [(num_copias * num_paginas) * req.sub_total]

        //Inserindo um pedido e seus detalhes/serviços:
        await pedido.create({
            titulo_pedido: titulo_pedido,
            nif: req.user.nif,
            id_modo_envio: modo_envio,
            id_avaliacao_pedido: 0,
            avaliacao_obs: null,
            custo_total: custo_total,
            det_pedidos: {
                // id_pedido: ++,
                id_centro_custos: centro_custos,
                id_curso: curso,
                num_copias: num_copias,
                num_paginas: num_paginas,
                observacoes: observacoes,
                sub_total_copias: req.sub_total
            },
        },
            {
                include: ['det_pedidos', 'nif_usuario']
            }
        ).then(pedido => {
            req.id = pedido.id_pedido
            servico_pedido.create({
                pedidoId: pedido.id_pedido,
                servicoCT: servicoCT,
                servicoCA: servicoCA
            }).then(servico => {
                servicoCopiaTamanho.decrement({ quantidade: +(num_copias * num_paginas) }, {
                    where: {
                        id_servicoCT: servico.servicoCT
                    }
                });
                servicoCapaAcabamento.decrement({ quantidade: +(num_copias * num_paginas) }, {
                    where: {
                        id_servicoCA: servico.servicoCA
                    }
                });
            })
             res.json({ message: "Pedido realizado com sucesso!" })
        })
        next();
        return;
    },


    //PUT

    alterarAvaliacao: async (req, res, next) => {
        var { id_avaliacao_pedido, avaliacao_obs } = req.body

        if (!id_avaliacao_pedido) {
            return res.json({ error: "Informe se o pedido lhe atendeu ou não, por favor!" })
        }

        var pedidos = await pedido.findByPk(req.params.id)

        if (pedidos == null) {
            return res.json({ message: "Esse pedido não existe!" })
        }

        if(pedidos.id_avaliacao_pedido !== 0){
            return res.json({ message: "Esse pedido já foi avaliado!"})
        }

        if (req.user.nif === pedidos.nif) {
            await pedidos.update({ id_avaliacao_pedido, avaliacao_obs })
            res.status(200).json({ message: `Avaliação do pedido ${req.params.id} atualizada com sucesso!` });
            
            req.avaliacao_obs = avaliacao_obs; //Passando mensagem para requisição, para podermos usar em outras etapas da requisição (mailer.EnviaEmail)
            req.titulo_pedido = pedidos.titulo_pedido; //Titulo do pedido que foi atualizado
            req.id = pedidos.id_pedido; //ID do pedido que foi atualizado
            req.nif = pedidos.nif; // NIF do usuário que atualizou o pedido
            next();
            return;
        }
        else {
            return res.json({ error: "Você só pode alterar a avaliação de um pedido feito pelo seu usuário" })
        }
    }
}