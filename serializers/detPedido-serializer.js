const { initModels } = require("../models/init-models");
const { sequelize } = require("../models");
var models = initModels(sequelize);

const serializer = async (req, res, next) => {

    //Função que busca as descrições nas tabelas em função das constraints das mesmas 
    //passadas nas tabelas: Pedido, det_pedido, usuario e tabelas para relacionamento n:m
    verifica = async (centro_custos, curso, modo_envio, avaliacao,
        tamanho_pagina, tipos_copia, tipos_capa, acabamento) => {

        if (centro_custos) {
            var data = await models.centro_custos.findAll({
                where: { id_centro_custos: centro_custos }
            })
            req.centro_custos = data[0].descricao
        }

        if (curso) {
            let data = await models.curso.findAll({
                where: { id_curso: curso }
            })
            req.curso = data[0].descricao;
        }


        if (modo_envio) {
            let data = await models.modo_envio.findAll({
                where: { id_modo_envio: modo_envio }
            })
            req.modo_envio = data[0].descricao;
        }

        if (avaliacao >= 0) {
            let data = await models.avaliacao_pedido.findAll({
                where: { id_avaliacao_pedido: avaliacao }
            })
            req.avaliacao_pedido = data[0].descricao;
        }

        //DETALHES DO PEDIDO

        if (tamanho_pagina) {
            let data = await models.tamanho_pagina.findAll({
                where: { id_tamanho: tamanho_pagina }
            })
            req.tamanho_pagina = data[0].descricao;
        }

        if (tipos_copia) {
            let data = await models.tipos_copia.findAll({
                where: { id_tipos_copia: tipos_copia }
            })
            req.tipos_copia = data[0].descricao;
        }

        if (tipos_capa) {
            let data = await models.tipos_capa.findAll({
                where: { id_tipos_capa: tipos_capa }
            })
            //tc = [{id_tipos_capa: 2..., descricao: PVC...}]
            req.tipos_capa = data[0].descricao;
            //tipos capa = PVC
        }

        if (acabamento) {
            let data = await models.acabamento.findAll({
                where: { id_acabamento: acabamento }
            })
            req.acabamento = data[0].descricao;
        }
    }

    //Alterando descrição dos campos com constraints para enviar e-mail
    if (req.body.centro_custos) {
        var { centro_custos, tipos_copia, tipos_capa, modo_envio, tamanho_pagina, acabamento, curso } = req.body

        await verifica(centro_custos, curso, modo_envio, 0, tamanho_pagina, tipos_copia, tipos_capa, acabamento)
        next()
        return;
    }

    //Alterando descrição dos campos com constraints para enviar para o front-end
     if (req.pedidos) {
        var pedidos = []
        for (let i = 0; i < req.pedidos.length; i++) {

            pedidos[i] = {
                id_pedido: req.pedidos[i].id_pedido,
                nif: req.pedidos[i].nif,
                titulo_pedido: req.pedidos[i].titulo_pedido,
                centro_custos: req.pedidos[i].id_centro_custos,
                curso: req.pedidos[i].id_curso,
                modo_envio: req.pedidos[i].id_modo_envio,
                avaliacao_pedido: req.pedidos[i].id_avaliacao_pedido,
                avaliacao_obs: req.pedidos[i].avaliacao_obs,
                custo_total: req.pedidos[i].custo_total,
                criado: req.pedidos[i].createdAt,
                atualizado: req.pedidos[i].updatedAt,
                detalhes_pedido: [{
                    id_det_pedido: req.pedidos[i].det_pedidos[0].id_det_pedido,
                    id_pedido: req.pedidos[i].det_pedidos[0].id_pedido,
                    tamanho: req.pedidos[i].det_pedidos[0].id_tamanho,
                    observacoes: req.pedidos[i].det_pedidos[0].observacoes,
                    tipo_copia: req.pedidos[i].det_pedidos[0].id_tipos_copia,
                    tipo_capa: req.pedidos[i].det_pedidos[0].id_tipos_capa,
                    acabamento: req.pedidos[i].det_pedidos[0].id_acabamento,
                    num_copias: req.pedidos[i].det_pedidos[0].num_copias,
                    num_paginas: req.pedidos[i].det_pedidos[0].num_paginas,
                    sub_total: req.pedidos[i].det_pedidos[0].sub_total_copias,
                    criado: req.pedidos[i].det_pedidos[0].createdAt,
                    atualizado: req.pedidos[i].det_pedidos[0].updatedAt
                }
                ],
                servico_1: [{
                    id_servico: req.pedidos[i].servicos[0].id_servico,
                    descricao: req.pedidos[i].servicos[0].descricao,
                    quantidade: req.pedidos[i].servicos[0].quantidade,
                    valor_unitario: req.pedidos[i].servicos[0].valor_unitario,
                }],
                servico_2: [{
                    id_servico: req.pedidos[i].servicos[1].id_servico,
                    descricao: req.pedidos[i].servicos[1].descricao,
                    quantidade: req.pedidos[i].servicos[1].quantidade,
                    valor_unitario: req.pedidos[i].servicos[1].valor_unitario,
                }]
            }

            //Passando valores pelo por parâmetro
            await verifica(pedidos[i].centro_custos, pedidos[i].curso, pedidos[i].modo_envio, pedidos[i].avaliacao_pedido,
                pedidos[i].detalhes_pedido[0].tamanho, pedidos[i].detalhes_pedido[0].tipo_copia, pedidos[i].detalhes_pedido[0].tipo_capa,
                pedidos[i].detalhes_pedido[0].acabamento
            )

            //PEDIDO
            pedidos[i].centro_custos = req.centro_custos;
            pedidos[i].curso = req.curso;
            pedidos[i].modo_envio = req.modo_envio;
            pedidos[i].avaliacao_pedido = req.avaliacao_pedido;

            //DETALHES DO PEDIDO
            pedidos[i].detalhes_pedido[0].tamanho = req.tamanho_pagina;
            pedidos[i].detalhes_pedido[0].tipo_copia = req.tipos_copia;
            pedidos[i].detalhes_pedido[0].tipo_capa = req.tipos_capa;
            pedidos[i].detalhes_pedido[0].acabamento = req.acabamento;
        }
        return res.json(pedidos)
    }
    else { return res.json({ error: "Pedido não encontrado!" }) }
    
}

module.exports = serializer;