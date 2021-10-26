const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { authJwt } = require("../middlewares");
const { sequelize } = require("../models");

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { pedido, det_pedido, servico } = initModels(sequelize)

module.exports = {

    ////GET 

    //Buscar os pedidos por ID do pedido
    buscarPorIdPedido: async (req, res, next) => {
        var pedidos = await pedido.findByPk(req.params.id, {
            include: ['det_pedidos', 'servicos']
        });

        //Retorna mensagem se encontrar um pedido nulo.
        if (pedidos == null) {
            return res.json({ message: `Nenhum pedido com id ${req.params.id}` });
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

    estatisticasMensais: async (req, res) => {
        var { ano, mes } = req.params;

        let endDate = new Date(`${ano}-${mes}-31 23:59:59`);
        let startedDate = new Date(`${ano}-${mes}-01 00:00:00`);

        //Pedido

        //Soma custo total
        let custo_total = await pedido.sum('custo_total', {
            where: {
                createdAt: {
                    [Op.between]: [startedDate, endDate]
                }
            },
        });

        //Det Pedido 

        //Total de copias mensais
        let total_copias = await det_pedido.sum('num_copias', {
            where: {
                createdAt: {
                    [Op.between]: [startedDate, endDate]
                }
            },
        });

        //Total de número de páginas solicitadas por mês
        let num_paginas = await det_pedido.sum('num_paginas', {
            where: {
                createdAt: {
                    [Op.between]: [startedDate, endDate]
                }
            },
        });

        let folhas_impressas = (total_copias * num_paginas);


        //Copias Preto&Branco
        let cp_pretoBranco = await det_pedido.count({
            where: {
                createdAt: {
                    [Op.between]: [startedDate, endDate]
                },
                id_tipos_copia: 1 //Preto e Branco (P&B)
            }
        })

        //Copias Coloridas
        let cp_coloridas = await det_pedido.count({
            where: {
                createdAt: {
                    [Op.between]: [startedDate, endDate]
                },
                id_tipos_copia: 2 //Coloridas
            }
        })



        // 1 = Copias encadernadas (PAPEL)
        let tipos_capa_papel = await det_pedido.sum("id_tipos_capa", {
            where: {
                createdAt: {
                    [Op.between]: [startedDate, endDate]
                },
                id_tipos_capa: 1
            },
        });

        //2 = Copias encadernadas (PVC)
        let tipos_capa_pvc = await det_pedido.sum("id_tipos_capa", {
            where: {
                createdAt: {
                    [Op.between]: [startedDate, endDate]
                },
                id_tipos_capa: 2
            },
        });

        res.json({
            "Mês": mes,
            "Ano": ano,
            "Total número de páginas": num_paginas,
            "Total de folhas impressas": folhas_impressas,
            "Total de cópias preto e branco": cp_pretoBranco,
            "Total de cópias coloridas": cp_coloridas,
            "Total de encadernações (Papel)": tipos_capa_papel,
            "Total de encadernações (PVC)": tipos_capa_pvc,
            "Total número de cópias": total_copias,
            "Total de custo mês": custo_total
        })

    },


    estatisticasQuatroMeses: async (req, res) => {
        var dataAtual = new Date();
        var ano = dataAtual.getFullYear();
        var mes = (dataAtual.getMonth() + 1);
        // var dia = dataAtual.getDate();
        // var horas = dataAtual.getHours();
        // var minutos = dataAtual.getMinutes();
        // var segundos = dataAtual.getSeconds();
        mesObj = {};
        //Fazendo o for percorrer 3 meses antes do nosso
        var i = mes - 3;
        for (i; i < mes + 1; i++) {
            //Passando valores dos meses para variável i caso o mês seja janeiro e 
            //queiramos retornar os valores dos meses 12, 11 e 10
            if (i === -2) {
                i = 10
            }
            if (i === -1) {
                i = 11
            }
            if (i === 0) {
                i = 12
            }
            let endDate = new Date(`${ano}-${i}-31 23:59:59`);
            let startedDate = new Date(`${ano}-${i}-01 00:00:00`);
            const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            mesObj[i] = {
                ano: ano,
                mes: meses[i - 1],
                total_copias: "",
                num_paginas: "",
                folhas_impressas: ""
            }
            mesObj[i].total_copias = await det_pedido.sum('num_copias', {
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    }
                },
            });
            mesObj[i].num_paginas = await det_pedido.sum('num_paginas', {
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    }
                },
            });
            mesObj[i].folhas_impressas = (mesObj[i].total_copias * mesObj[i].num_paginas);
            //Continuando o Looping para trazer os meses antes de janeiro (1) -> dezembro (12)...
            if (i === 10 && mes < 4) {
                i = -2
            }
            if (i === 11 && mes < 4) {
                i = -1
            }
            if (i === 12 && mes < 4) {
                i = 0
            }
        };
        res.json(mesObj);
    },

    estatisticasCentroCustosMensal: async (req, res) => {
        const { mes, ano } = req.params;

        let endDate = new Date(`${ano}-${mes}-31 23:59:59`);
        let startedDate = new Date(`${ano}-${mes}-01 00:00:00`);
       
        var num_centro_custos = 8;
        var centro_custosObj = {};

        for (let i = 1; i < num_centro_custos + 1; i++) {

            centro_custosObj[i] = {
                qtdade_solicitada: 0
            }

            let centro_custos_mensal = await pedido.count({
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    },
                    id_centro_custos: i
                }   
            })
            centro_custosObj[i].qtdade_solicitada = centro_custos_mensal
        }

        res.json(centro_custosObj)
    },

    estatisticasCursoMensal: async (req, res) => {
        const { mes, ano } = req.params;

        let endDate = new Date(`${ano}-${mes}-31 23:59:59`);
        let startedDate = new Date(`${ano}-${mes}-01 00:00:00`);

        var num_curso = 4;
        var cursoObj = {};

        for (let i = 1; i < num_curso + 1; i++) {

            cursoObj[i] = {
                qtdade_solicitada: 0
            }

            let curso_mensal = await pedido.count({
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    },
                    id_curso: i
                }   
            })
            cursoObj[i].qtdade_solicitada = curso_mensal
        }

            res.json(cursoObj)
    }

};

// SELECT num_copias AS 'copias',createdAt FROM det_pedido WHERE createdAt LIKE '%%%%-10-%%';

// SELECT id_tipos_copia, count(*) AS 'quantidade' FROM det_pedido GROUP BY id_tipos_copia ;

// SELECT SUM(custo_total),createdAt FROM pedido WHERE createdAt LIKE '%%%%-10-%%';

// SELECT id_tipos_capa, count(*) AS 'quantidade' FROM det_pedido GROUP BY id_tipos_capa ;

// SELECT id_depto, count(*) AS 'quantidade' FROM usuario GROUP BY id_depto HAVING count(*)   ;

// SELECT id_curso, count(*) AS 'quantidade ' FROM pedido GROUP BY id_curso HAVING count(*)   ;
