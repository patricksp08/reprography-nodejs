
const { initModels } = require("../models/init-models");
var { pedido } = initModels(sequelize)

module.exports = {    //Todos os pedidos feito por tal pessoa (nif)
    findByPk: async (id) => {
        var pedidos = await pedido.findByPk(id, {
            include: ['det_pedidos', 'servico_pedidos']
        });

        return pedidos;
    }
}
