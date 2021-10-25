const Sequelize = require("sequelize");
const { initModels } = require("../models/init-models")
var { servico } = initModels(sequelize)

module.exports = {

    servicosGet: async (req, res) => {
        servicos = await servico.findAll()
        console.log(servicos)
        res.json(servicos)
    },

    servicosPut: async (req, res) => {

        var { quantidade, valor_unitario } = req.body;
        var { id } = req.params;

        servicos = await servico.findAll({
            where: { id_servico: id }
        })

        if (servicos.lenght < 1) {
            return res.json({ message: "Não há nenhum serviço" })
        }
        else {
            servicos.update({ quantidade, valor_unitario })
            return res({ message: `Servico ${servicos.id_servico} atualizado com sucesso!` })
        }
    }

}