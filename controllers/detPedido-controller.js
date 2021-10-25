const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { authJwt } = require("../middlewares");
const { sequelize } = require("../models");

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { pedido, det_pedido, servico } = initModels(sequelize)

module.exports = {

    //Buscar os pedidos por ID do pedido
    buscarPorIdPedido: async (req, res, next) => {
        var pedidos = await pedido.findByPk(req.params.id, {
            include: ['det_pedidos', 'servicos']
        });

        //Retorna mensagem se encontrar um pedido nulo.
        if (pedidos == null) {
            return res.json({ message: `Nenhum pedido com id ${req.params.id}` })
        }

        //Só passa para o serializer se o nif fornecido no login for o mesmo ao nif cadastrado no pedido.
        else if (req.user.nif === pedidos.nif) {
            req.pedidos = [pedidos]
            next();
            return;
        }

        // Verificando se o usuário que está querendo ver os detalhes do pedido de outro usuário é administrador
        else {
            req.pedidos = [pedidos]
            authJwt.isAdmin(req, res, next);
        }
    },


    getSumCopias: async (req, res) => {
        var { ano, mes } = req.params;

        const startedDate = new Date(`${ano}-${mes}-01 00:00:00`);
        const endDate = new Date(`${ano}-${mes}-31 23:59:59`);

        total_copias = await det_pedido.sum('num_copias', {
            where: {
                createdAt: {
                    [Op.between]: [startedDate, endDate]
                }
            },
        })

        num_paginas = await det_pedido.sum('num_paginas', {
            where: {
                createdAt: {
                    [Op.between]: [startedDate, endDate]
                }
            },
        })

        folhas_impressas = (total_copias*num_paginas);

        res.json({
            "Mês": mes,
            "Ano": ano,            
            "Total de páginas": num_paginas,
            "Total de cópias": total_copias,
            "Total de folhas impressas (total de copias * num paginas)": folhas_impressas
        })
    }
}

//2021-10-25 09:46:20
// Project.sum('age').then(sum => {