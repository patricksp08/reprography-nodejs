const { initModels } = require("../models/init-models");
const { sequelize } = require("../models");
var models = initModels(sequelize);

const verify =  async (req,res) => {
    pedidos = []

    
        for (let i = 0; i < pedidos.length; i++) {

            if(req.pedidos){
                // pedidos = req.pedidos
                pedidos = [
                    id_pedido = req.pedido[i].id_pedido,
                    nif = req.pedido[i].nif,
                    titulo_pedido = req.pedido[i].titulo_pedido,
                    centro_custos = req.pedido[i].id_centro_custos,
                    modo_envio = req.pedido[i].id_modo_envio,
                    curso = req.pedido[i].id_curso,
                    avaliacao = req.pedido[i].id_avaliacao_pedido
                    avaliacao_obs = req.pedido[i].avaliacao_obs
                    custo_total = 

                ]

            if(pedidos[i].id_centro_custos){
                var centro_custos = await models.centro_custos.findAll({
                    where: {id_centro_custos: pedidos[i].id_centro_custos}
                })
                pedidos[i].id_centro_custos = centro_custos[0].descricao
            }
            res.json(pedidos)
        }
    }
}

module.exports = verify;
