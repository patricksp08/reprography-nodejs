const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { pedido, det_pedido, tipos_copia, tipos_capa, centro_custos, curso, } = initModels(sequelize);

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

module.exports = {

    //Estatisticas sobre as tabelas pedido e det_pedido por Mês. 
    //Aqui o usuário vai passar o Ano e o Mês que quer consultar.
    estatisticasMensais: async (req, res) => {
        const { ano, mes } = req.params;

        const endDate = new Date(`${ano}-${mes}-31 23:59:59`);
        const startedDate = new Date(`${ano}-${mes}-01 00:00:00`);

        //Pedido

        //Quantidade de pedidos solicitados no mes passado por parametro

        var pedidos = await pedido.count({
            where: {
                createdAt: {
                    [Op.between]: [startedDate, endDate]
                }
            },
        });

        //Soma custo total 
        var custo_total = await pedido.sum('custo_total', {
            where: {
                createdAt: {
                    [Op.between]: [startedDate, endDate]
                }
            },
        });

        //Det Pedido 

        //Total de copias mensais
        var total_copias = await det_pedido.sum('num_copias', {
            where: {
                createdAt: {
                    [Op.between]: [startedDate, endDate]
                }
            },
        });

        //Total de número de páginas solicitadas por mês
        var num_paginas = await det_pedido.sum('num_paginas', {
            where: {
                createdAt: {
                    [Op.between]: [startedDate, endDate]
                }
            },
        });

        var folhas_impressas = (total_copias * num_paginas);

        //Copias Preto e Branco e Coloridas
        const num_tipos_copia = 2;

        //Objeto que será preenchido com descricao e quantidade
        var objColor = {};

        //Percorrendo os dois tipos de capa e trazendo os valores quando id_tipos_copia = 1 e depois quando id_tipos_copia = 2
        for (let i = 1; i < num_tipos_copia + 1; i++) {

            const tipos_copiaDesc = await tipos_copia.findOne({ where: { id_tipos_copia: i } }, { attributes: ["descricao"] });

            var tipos_copiaCount = await det_pedido.count({
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    },
                    id_tipos_copia: i
                }
            })

            objColor[i] = {
                descricao: tipos_copiaDesc.descricao,
                qtdade_solicitada: tipos_copiaCount
            }
        }

        //Tipos de capa: 1 = (PAPEL) ; 2 = (PVC)
        const num_tipos_capa = 2;

        //Objeto que será preenchido com descricao e quantidade
        var objCapa = {};

        //Percorrendo os dois tipos de capa e trazendo os valores quando id_tipos_capa = 1 e depois quando id_tipos_capa = 2
        for (let i = 1; i < num_tipos_capa + 1; i++) {

            const tipos_capaDesc = await tipos_capa.findOne({ where: { id_tipos_capa: i } }, { attributes: ["descricao"] });

            var tipos_capaCount = await det_pedido.count({
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    },
                    id_tipos_capa: i
                },
            });

            objCapa[i] = {
                descricao: tipos_capaDesc.descricao,
                qtdade_solicitada: tipos_capaCount
            }
        }

        const num_curso = 4;
        var cursoObj = {};

        for (let i = 1; i < num_curso + 1; i++) {

            const cursoDesc = await curso.findOne({ where: { id_curso: i } }, { attributes: ["descricao"] });

            let cursoCount = await pedido.count({
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    },
                    id_curso: i
                }
            })

            cursoObj[i] = {
                centro_custos: cursoDesc.descricao,
                qtdade_solicitada: cursoCount,
            }
        }

        const num_centro_custos = 8;
        var centro_custosObj = {};

        for (let i = 1; i < num_centro_custos + 1; i++) {

            const centro_custosDesc = await centro_custos.findOne({ where: { id_centro_custos: i } }, { attributes: ["descricao"] });

            const centro_custosCount = await pedido.count({
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    },
                    id_centro_custos: i
                }
            })

            centro_custosObj[i] = {
                centro_custos: centro_custosDesc.descricao,
                qtdade_solicitada: centro_custosCount,
            }
        }

        return res.json({
            mes: meses[mes - 1],
            ano: ano,
            pedidos: pedidos,
            num_paginas: num_paginas,
            num_copias: total_copias,
            folhas_impressas: folhas_impressas,
            tipos_copia: objColor,
            tipos_capa: objCapa,
            centro_custos: centro_custosObj,
            curso: cursoObj,
            custo_total: custo_total
        })
    },

    //Estatisticas dos ultimos 3 meses + mês Atual.
    estatisticasQuatroMeses: async (req, res) => {
        const dataAtual = new Date();
        const ano = dataAtual.getFullYear();
        const mes = (dataAtual.getMonth() + 1);

        //Objeto que será preenchido
        var mesObj = {};

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

            //Quantidade de Pedidos realizados nos últimos 3 meses + mês atual
            var pedidos = await pedido.count({
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    }
                },
            });

            var total_copias = await det_pedido.sum('num_copias', {
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    }
                },
            });

            var num_paginas = await det_pedido.sum('num_paginas', {
                where: {
                    createdAt: {
                        [Op.between]: [startedDate, endDate]
                    }
                },
            });

            var folhas_impressas = (total_copias * num_paginas);

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

            mesObj[i] = {
                ano: ano,
                mes: meses[i - 1],
                pedidos: pedidos,
                num_paginas: num_paginas,
                num_copias: total_copias,
                folhas_impressas: folhas_impressas
            }
        };
        return res.json(mesObj);

    },
}

// SELECT num_copias AS 'copias',createdAt FROM det_pedido WHERE createdAt LIKE '%%%%-10-%%';

// SELECT id_tipos_copia, count(*) AS 'quantidade' FROM det_pedido GROUP BY id_tipos_copia ;

// SELECT SUM(custo_total),createdAt FROM pedido WHERE createdAt LIKE '%%%%-10-%%';

// SELECT id_tipos_capa, count(*) AS 'quantidade' FROM det_pedido GROUP BY id_tipos_capa ;

// SELECT id_depto, count(*) AS 'quantidade' FROM usuario GROUP BY id_depto HAVING count(*)   ;

// SELECT id_curso, count(*) AS 'quantidade ' FROM pedido GROUP BY id_curso HAVING count(*)   ;