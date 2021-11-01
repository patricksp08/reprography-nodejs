const Sequelize = require("sequelize");
const { initModels } = require("../models/init-models")
var { servicoCapaAcabamento, servicoCopiaTamanho } = initModels(sequelize)

module.exports = {

    servicosGet: async (req, res) => {

        const servicoCA = await servicoCapaAcabamento.findAll();
        const servicoCT = await servicoCopiaTamanho.findAll();

        const servicos = [servicoCA, servicoCT]
        res.json(servicos)
    },

    servicosPost: async (req, res) => {
        const { descricaoCA, quantidadeCA, valor_unitarioCA } = req.body;

        const { descricaoCT, quantidadeCT, valor_unitarioCT } = req.body;

        if(quantidadeCT !== "" || quantidadeCT !== null){
            await servicoCopiaTamanho.create({
                descricao: descricaoCT,
                quantidade: quantidadeCT,
                valor_unitario: valor_unitarioCT
            }).then(servicoCT => {
                return res.json({ message: `Serviço ${servicoCT.id_servicoCT} criado!`})
            })
        } 
        else if(quantidadeCA !== "" || quantidadeCA !== null){
            await servicoCapaAcabamento.create({
                descricao: descricaoCA,
                quantidade: quantidadeCA,
                valor_unitario: valor_unitarioCA
            }).then(servicoCA => {
                return res.json({ message: `Serviço ${servicoCA.id_servicoCT} criado!`})
            })
        }
        else{
            return res.json({ error: "Insira a quantidade do seu serviço!"})
        }
    },

    servicosPut: async (req, res) => {
        var { id } = req.params;
        var { quantidade, valor_unitario } = req.body;

        const servicos = await servico.findByPk(id)

        if (servicos === null) {
            return res.json({ message: "Não há nenhum serviço" })
        }
        else {
            await servicos.update({ quantidade, valor_unitario })
            return res.json({ message: `Servico ${servicos.id_servico} atualizado com sucesso!` })
        }
    },

    servicosDelete: async (req, res) => {

    }
}