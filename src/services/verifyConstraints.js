const { initModels } = require("../models/init-models");
const { sequelize } = require("../models");
var models = initModels(sequelize);

const verifyConstraints = async ({ centro_custos, curso, modo_envio, avaliacao,
    tamanho_pagina, tipos_copia, tipos_capa, acabamento, servicoCA, servicoCT }) => {

    var { descCentroCustos, descCurso, descModoEnvio, descAvaliacaoPedido } = null

    if (centro_custos) {
        var dataCentroCustos = await models.centro_custos.findOne({
            where: { id_centro_custos: centro_custos }
        });

        descCentroCustos = dataCentroCustos.descricao
    }

    if (curso) {
        var dataCurso = await models.curso.findOne({
            where: { id_curso: curso }
        });

        descCurso = dataCurso.descricao
    }


    if (modo_envio) {
        var dataModoEnvio = await models.modo_envio.findAll({
            where: { id_modo_envio: modo_envio }
        });

        descModoEnvio = dataModoEnvio.descricao
    }

    if (avaliacao !== null) {
        var dataAvaliacaoPedido = await models.avaliacao_pedido.findOne({
            where: { id_avaliacao_pedido: avaliacao }
        });

        descAvaliacaoPedido = dataAvaliacaoPedido.descricao
    }

    if(servicoCT) {
        var dataServicoCT = await models.servicoCopiaTamanho.findOne({
            where:{
                id_servicoCT: servicoCT
            }
        })
    }

    return data = {
        descCentroCustos,
        descCurso,
        descModoEnvio,
        descAvaliacaoPedido
    }
}
module.exports = verifyConstraints;