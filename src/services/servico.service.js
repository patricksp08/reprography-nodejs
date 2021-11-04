const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { initModels } = require("../models/init-models");

var { servicoCapaAcabamento, servicoCopiaTamanho } = initModels(sequelize)

module.exports = {

    findAllServicos: async (enabled) => {
        const servicoCA = await servicoCapaAcabamento.findAll({
            where:{
                ativado: enabled
            }
        });
        const servicoCT = await servicoCopiaTamanho.findAll({
            where:{
                ativado: enabled
            }
        });
        
        const servicos = {"servicosCA": servicoCA, "servicosCT": servicoCT}
        
        return servicos;
    },

    findServicoByPk: async ({ type, id }) => {

        if (type === "ct") {
            var servico = servicoCopiaTamanho;
        }
        else if (type === "ca") {
            var servico = servicoCapaAcabamento;
        }
        else {
            return;
        }

        const serv = await servico.findByPk(id);

        return serv;
    },

    createServico: async ({ type, params }) => {

        if (type === "ct") {
            var servico = servicoCopiaTamanho;
        }
        else if (type === "ca") {
            var servico = servicoCapaAcabamento;
        }
        else {
            return;
        }

        const serv = await servico.create(params);

        return serv;
    },

    serviceDecrement: async ({ type, number, param }) => {

        if (type === "ct") {
            var servico = servicoCopiaTamanho;
        }
        else if (type === "ca") {
            var servico = servicoCapaAcabamento;
        }
        else {
            return;
        }

        const serv = await servico.decrement({ quantidade: + param }, {
            where: {
                id_servico: {
                    [Op.or]: [number]
                }
            }
        });

        return serv;
    },

    updateServico: async ({ servico, param }) => {
        const updated = await servico.update(param);
        return updated;
    },

    destroyServico: async () => {

    }
}