const Sequelize = require("sequelize")
const Op = Sequelize.Op;

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { pedido, det_pedido, servico } = initModels(sequelize)


module.exports = {
    ////GET 

    //Buscar todos os pedidos da tabela pedido
    buscarTodos: async (req, res) => {
        const pedidos = await pedido.findAll(
            {
                include: ['det_pedidos', 'servicos']
            },
        );
        console.log(pedidos)
        res.json(pedidos)
    },

    buscarPorNome: async (req, res) => {                                                                                                          
        const pedidoParam = req.params.pedido;
        // const query = `%${req.query.search}`;
        let pedidos = await pedido.findAll({
            where: {
                titulo_pedido: {
                    [Op.like]: `${pedidoParam}%`
                }
            },
            include: [
                'det_pedidos'
            ]
        });
        console.log(pedidos)
        res.json(pedidos)
    },

    //Buscar os pedidos por ID do pedido
    buscarPorIdPedido: async (req, res) => {
        const pedidos = await pedido.findByPk(req.params.id, {
            include: [
                'det_pedidos'
            ]
        });
        console.log(pedidos)
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

    //POST

    //Adicionar pedido com detalhe solicitado por nif (usuario)
    adicionar: async (req, res) => {
        //Input que será enviado para tabela Pedido
        let { centro_custos, titulo_pedido, modo_envio, avaliacao_pedido, curso, observacoes } = req.body;

        // Input que será enviado para tabela Det_Pedido
        let { num_copias, num_paginas, tipos_copia, acabamento, tamanho_pagina, tipos_capa } = req.body

        var servicos = [];
        var sub_total_copias = 0;

        //Lógica para sub_total - Switch  

        // ** Switch com Lógica, fornecer no parâmetro os campos 
        // *** a serem comparados e seus casos abaixo:

        //Incremento de valores dependendo do serviços

        // importante -> Pegar esses valores do banco, e colocar a verificação se o serviço é > 0 no switch
        switch (tipos_copia && tamanho_pagina) {
            case '1' && '3':
                sub_total_copias += 0.06
                var num = 1
                servicos.push(num)
                break;

            case '1' && '2':
                sub_total_copias += 0.024
                var num = 2
                servicos.push(num)
                break;

            case '1' && '1':
                sub_total_copias += 0.15
                var num = 3
                servicos.push(num)
                break;

            case '2' && '2':
                sub_total_copias += 0.1
                var num = 4
                servicos.push(num)
                break;

            case '1' && '4':
                sub_total_copias += 0.3
                var num = 5
                servicos.push(num)
                break;

            case '1' && '5':
                sub_total_copias += 0.3
                var num = 5
                servicos.push(num)
                break;

            default:
                sub_total_copias = 0
                break;
        };



        switch (tipos_capa && acabamento) {
            case '1' && '3':
                sub_total_copias += 0.07
                var num = 6
                servicos.push(num)
                break;

            case '1' && '2':
                sub_total_copias += 0.05
                var num = 7
                servicos.push(num)
                break;

            case '1' && '1':
                sub_total_copias += 0.5
                var num = 8
                servicos.push(num)
                break;

            case '2' && '2':
                sub_total_copias += 0.45
                var num = 9
                servicos.push(num)
                break;

            default:
                sub_total_copias = 0
                break;
        }


        //Inserindo um pedido e seus detalhes/serviços:

        await pedido.create({
            id_centro_custos: centro_custos,
            nif: req.user.nif,
            titulo_pedido: titulo_pedido,
            custo_total: [(num_copias * num_paginas) * sub_total_copias],
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
            servico.decrement({ quantidade: +(num_copias * num_paginas) }, {
                where: {
                    id_servico: {
                        [Op.or]: servicos
                    }
                }
            });
            servico.findAll({
                where: {
                    id_servico: {
                        [Op.or]: servicos
                    }
                }
            }).then(servicos => {
                pedido.setServicos(servicos)
                // .then(roles => {
                // res.status(200).send("User was registered successfully!");
                // });
            });
        })
        res.status(200).json({ message: "Pedido realizado com sucesso" });
    }
}