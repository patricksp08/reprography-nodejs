const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { initModels } = require("../models/init-models");
var { servico } = initModels(sequelize);

const verifyService = async (req, res, next) => {
    req.servicos = [];
    req.sub_total = 0;

    //Lógica para sub_total - Switch  

    // ** Switch com Lógica, fornecer no parâmetro os campos 
    // *** a serem comparados e seus casos abaixo:

    //Incremento de valores dependendo do serviços

    // importante -> Pegar esses valores do banco, e colocar a verificação se o serviço é > 0 no switch
    var { tipos_copia, tamanho_pagina, tipos_capa, acabamento } = req.body;

    switch (tipos_copia && tamanho_pagina) {
        case '1' && '3':
            req.servicos.push(1)
            break;

        case '1' && '2':
            req.servicos.push(2)
            break;

        case '1' && '1':
            req.servicos.push(3)
            break;

        case '2' && '2':
            req.servicos.push(4)
            break;

        case '1' && '4':
            req.servicos.push(5)
            break;


        case '1' && '5':
            req.servicos.push(5)
            break;

        default:
            null
            break;
    };

    switch (tipos_capa && acabamento) {
        case '1' && '3':
            req.servicos.push(6)
            break;

        case '1' && '2':
            req.servicos.push(7)
            break;

        case '1' && '1':
            req.servicos.push(8)
            break;

        case '2' && '2':
            req.servicos.push(9)
            break;

        default:
            null
            break;
    };

    const serv = await servico.findAll(
        {
            where: {
                id_servico: {
                    [Op.or]: req.servicos
                }
            },
        }
    );

    for (let i = 0; i < serv.length; i++) {
        req.sub_total += parseFloat(serv[i].valor_unitario)
        if (serv[i].quantidade <= 0) {
            return res.json({ error: `O serviço ${serv[i].descricao} está esgotado!` })
        }
    }
    next();
    return;
}

module.exports = verifyService;
