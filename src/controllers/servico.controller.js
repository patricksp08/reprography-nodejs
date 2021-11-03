const service = require("../services/servico.service");

module.exports = {

    servicosGet: async (req, res) => {
        const servicos = await service.findAllServicos();
        return res.json(servicos);
    },

    servicosGetByPk: async( req, res ) => {
        const { id, type } = req.params;

        const servicos = await service.findServicoByPk({type: type, id: id});

        return res.json(servicos);

    },

    servicosPost: async (req, res) => {
    const { descricao, quantidade, valor_unitario } = req.body;
    const { type } = req.params;

      if(quantidade !== "" || quantidade !== null){
        await service.createServico({ type: type, params: {descricao: descricao, quantidade: quantidade, valor_unitario: valor_unitario} })
        .then(servico => {
            var status = "ok";

            if(type === "ca"){
                var message =  `Serviço Capa&Acabamento ${servico.id_servicoCA} criado!`;
            }
            else if(type ==="ct") {
                message = `Serviço Copia&Tamanho ${servico.id_servicoCT} criado!`;
            }
            else{
                status = "error";
                message = `Insira um tipo de serviço existente!`;
            }

            return res.json({ status: status, message: message })
        })
        }
        else{
            return res.json({ error: "Insira a quantidade do seu serviço!"})
        }
    },

    servicosPut: async (req, res) => {
        var { id, type } = req.params;
        var { quantidade, valor_unitario } = req.body;

        const servicos = await service.findServicoByPk({type, id}) //aqui temos que passar o type e o id, para ele buscar pela service.

        if (servicos === null) {
            return res.json({ message: "Não há nenhum serviço" });
        }
        else {
            await service.updateServico({servico: servicos, param: { quantidade, valor_unitario }}).then(servico => { //no update aqui temos que passar a array que recebemos do find...
                var status = "ok";
    
                if(type === "ca"){
                    var message =  `Serviço Capa&Acabamento ${servico.id_servicoCA} atualizado com sucesso!` ;
                }
                else if(type ==="ct") {
                    message = `Serviço Copia&Tamanho ${servico.id_servicoCT} atualizado com sucesso!` ;
                }
                else{
                    status = "error";
                    message = `Insira um tipo de serviço existente!`;
                }
                return res.json({ status: status, message: message })
            })
        }
    },

    // servicosEnableOrDisable: async (req, res) =>{
    //     const { nif, enable } = req.params;

    //     const user = await service.findUserbyPk(nif, {attributes: null});

    //     if (user == null) {
    //         return res.status(404).json({ status: 'error', message: "Usuário não encontrado!" });
    //     }

    //     await service.updateUser({user: user, param: { ativado: enable }});

    //     return res.json({ status: 'ok', message: `Status do Usuário ${user.nif} atualizado com sucesso!` });
    // },


    enableOrDisableServico: async (req, res) => {
        
    }
}