const { initModels } = require("../models/init-models");
var { servicoCapaAcabamento, servicoCopiaTamanho } = initModels(sequelize)

const verificaQtdade = (req, res, prop) => {

    const { num_copias, num_paginas } = req.body

    const folhasImpressas = num_paginas * num_copias;

    if (prop.quantidade < folhasImpressas) {
        req.err = true
        return res.json({ message: `Serviço ${prop.descricao} não contém quantidade suficiente para essa solicitação` })

    }
    if (prop.quantidade <= 0) {
        req.err = true
        return res.json({ message: `Serviço ${prop.descricao} está esgotado!` })

    }
}


const verifyService = async (req, res, next) => {

    const { servicoCA, servicoCT } = req.body
    req.err = false;

    //Regra de Negócio
    const CA = await servicoCapaAcabamento.findByPk(servicoCA);
    const CT = await servicoCopiaTamanho.findByPk(servicoCT);

    if(CA === null || CT === null) {
        return res.json({ error: "Insira um serviço valido!" })
    }

    await verificaQtdade(req, res, CA);
    await verificaQtdade(req, res, CT);

    req.sub_total = parseFloat(CA.valor_unitario + CT.valor_unitario);

    if (req.err === false) {
        next();
        return;
    }
}

module.exports = verifyService;
