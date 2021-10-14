const { initModels } = require("../models/init-models");
const { sequelize } = require("../models");
var models = initModels(sequelize);


exports.verifyDesc = async (req, res, next) => {
    var { centro_custos, tipos_copia, tipos_capa, modo_envio, tamanho_pagina, acabamento, curso } = req.body

    if (centro_custos) {
        let data  = await models.centro_custos.findAll({
            where: { id_centro_custos: centro_custos }
        })
        req.centro_custos = data[0].descricao;
    }

    if (tipos_copia) {
        let data= await models.tipos_copia.findAll({
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

    if (modo_envio) {
        let data = await models.modo_envio.findAll({
            where: { id_modo_envio: modo_envio }
        })
        req.modo_envio = data[0].descricao;
    }

    if (tamanho_pagina) {
        let data = await models.tamanho_pagina.findAll({
            where: { id_tamanho: tamanho_pagina }
        })
        req.tamanho_pagina = data[0].descricao;
    }

    if (acabamento) {
        let data = await models.acabamento.findAll({
            where: { id_acabamento: acabamento }
        })
        req.acabamento = data[0].descricao;
    }

    if (curso) {
        let data = await models.curso.findAll({
            where: { id_curso: curso }
        })
        req.curso = data[0].descricao;
    }
    next()
    return;
}