const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { initModels } = require("../models/init-models");
var { servico } = initModels(sequelize);

const verifyService = async (req, res, next) => {
    var servicos = [];
    var sub_total_copias = 0;

    //Lógica para sub_total - Switch  

    // ** Switch com Lógica, fornecer no parâmetro os campos 
    // *** a serem comparados e seus casos abaixo:

    //Incremento de valores dependendo do serviços

    // importante -> Pegar esses valores do banco, e colocar a verificação se o serviço é > 0 no switch
    var { tipos_copia, tamanho_pagina, tipos_capa, acabamento } = req.body;

    switch (tipos_copia && tamanho_pagina) {
        case '1' && '3':
            sub_total_copias += 0.06
            req.sub_total = sub_total_copias;
            servicos.push(1)
            req.servicos = servicos;
            break;

        case '1' && '2':
            sub_total_copias += 0.024
            req.sub_total = sub_total_copias;
            servicos.push(2)
            req.servicos = servicos;
            break;

        case '1' && '1':
            sub_total_copias += 0.15
            req.sub_total = sub_total_copias;
            servicos.push(3)
            req.servicos = servicos;
            break;

        case '2' && '2':
            sub_total_copias += 0.1;
            req.sub_total = sub_total_copias;
            servicos.push(4);
            req.servicos = servicos;
            break;

        case '1' && '4':
            sub_total_copias += 0.3;
            req.sub_total = sub_total_copias;
            servicos.push(5);
            req.servicos = servicos;
            break;


        case '1' && '5':
            sub_total_copias += 0.3;
            req.sub_total = sub_total_copias;
            servicos.push(5);
            req.servicos = servicos;
            break;

        default:
            sub_total_copias = 0;
            req.sub_total = sub_total_copias;
            break;
    };

    switch (tipos_capa && acabamento) {
        case '1' && '3':
            sub_total_copias += 0.07;
            req.sub_total = sub_total_copias;
            servicos.push(6);
            req.servicos = servicos;
            break;

        case '1' && '2':
            sub_total_copias += 0.05;
            req.sub_total = sub_total_copias;
            servicos.push(7);
            req.servicos = servicos;
            break;

        case '1' && '1':
            sub_total_copias += 0.5;
            req.sub_total = sub_total_copias;
            servicos.push(8);
            req.servicos = servicos;
            break;

        case '2' && '2':
            sub_total_copias += 0.45;
            req.sub_total = sub_total_copias;
            servicos.push(9);
            break;

        default:
            sub_total_copias = 0;
            req.sub_total = sub_total_copias;
            break;
    }


    const serv = await servico.findAll(
        {
            where: {
                id_servico: {
                    [Op.or]: servicos
                }
            },
        }
    );

    for (let i = 0; i < serv.length; i++) {
        console.log(serv[i].quantidade)
        if (serv[i].quantidade <= 0) {
            return res.json({ error: `O serviço ${serv[i].descricao} está esgotado!` })
        }
    }
    next();
    return;
}

module.exports = verifyService;
