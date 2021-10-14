const { initModels } = require("../models/init-models");
const { sequelize } = require("../models");
var models = initModels(sequelize);


exports.verifyDesc = (req, next) => {
    var { centro_custos, titulo_pedido, modo_envio, curso, observacoes, num_copias,
        num_paginas, tipos_copia, acabamento, tamanho_pagina, tipos_capa, mail } = req.body

    if (centro_custos) {
        const c_c = await models.centro_custos.findAll({
            where: { id_centro_custos: centro_custos }
        })
        centro_custos = c_c[0].descricao;
        next()
    }

    if (modo_envio) {
        const m_e = await models.centro_custos.findAll({
            where: { id_modo_envio: modo_envio }
        })
        modo_envio = m_e[0].descricao;
        next()
    }
}