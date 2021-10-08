const { initModels } = require("../models/init-models")
var models = initModels(sequelize)

exports.Inserir = async () => {
    models.acabamento.bulkCreate([
        {
            id_acabamento: 1,
            descricao: "Papel 2 grampos laterais"
        },
        {
            id_acabamento: 2,
            descricao: "Papel 2 grampos a cavalo"
        },
        {
            id_acabamento: 3,
            descricao: "Espiral de plástico"
        }
    ]);
    models.avaliacao_pedido.bulkCreate([
        {
            id_avaliacao_pedido: 0,
            descricao: "Não Avaliado"
        },
        {
            id_avaliacao_pedido: 1,
            descricao: "Atendeu!"
        },
        {
            id_avaliacao_pedido: 2,
            descricao: "Não atendeu!"
        }
    ]);
    models.centro_custos.bulkCreate([
        {
            id_centro_custos: 1,
            descricao: "Aprendizagem Industrial Presencial"
        },
        {
            id_centro_custos: 2,
            descricao: "Técnico de Nível Média Presencial"
        },
        {
            id_centro_custos: 3,
            descricao: "Graduação Tecnológica Presencial"
        },
        {
            id_centro_custos: 4,
            descricao: "Pós-Graduação Presencial"
        },
        {
            id_centro_custos: 5,
            descricao: "Extensão Presencial"
        },
        {
            id_centro_custos: 6,
            descricao: "Iniciação Profissional Presencial"
        },
        {
            id_centro_custos: 7,
            descricao: "Qualificação Profissional Presencial"
        },
        {
            id_centro_custos: 8,
            descricao: "Aperfeiç./Especializ. Profis. Presencial"
        }
    ]);
    await models.departamento.bulkCreate([
        {
            id_depto: 1,
            descricao: "Aprendizagem Industrial Presencial",
        },
        {
            id_depto: 2,
            descricao: "Técnico de Nível Médio Presencial",
        },
        {
            id_depto: 3,
            descricao: "Graduação Tecnológica Presencial",
        },
        {
            id_depto: 4,
            descricao: "Pós-Graduação Presencial",
        },
        {
            id_depto: 5,
            descricao: "Extensão Presencial",
        },
        {
            id_depto: 6,
            descricao: "Iniciação Profissional Presencial",
        },
        {
            id_depto: 7,
            descricao: "Qualificação Profissional Presencial",
        },
        {
            id_depto: 8,
            descricao: "Aperfeiç./Especializ. Profis. Presencial",
        },
    ]);

    models.curso.bulkCreate([
        {
            id_curso: 1,
            descricao: "CT-DS", //Curso Técnico de Desenvolvimento de Sistemas
            id_depto: 2
        },
        {
            id_curso: 2,
            descricao: "CT-MP", //Curso Técnico de Mecânica de Precisão
            id_depto: 2
        },
        {
            id_curso: 3,
            descricao: "CST-MP", //Curso Superior Técnico de Mecânica de Precisão
            id_depto: 3
        },
        {
            id_curso: 4,
            descricao: "Pós-Graduação", //Pós Graduação
            id_depto: 4
        }
    ]);

    models.modo_envio.bulkCreate([
        {
            id_modo_envio: 1,
            descricao: "Digital",
        },
        {
            id_modo_envio: 2,
            descricao: "Físico",
        },
    ]);
    models.tamanho_pagina.bulkCreate([
        {
            id_tamanho: 1,
            descricao: "A3",
        },
        {
            id_tamanho: 2,
            descricao: "A4",
        },
        {
            id_tamanho: 3,
            descricao: "A5",
        },
        {
            id_tamanho: 4,
            descricao: "Reduzida",
        },
        {
            id_tamanho: 5,
            descricao: "Ampliada",
        },
    ]);
    models.tipo_usuario.bulkCreate([
        {
            id: 1,
            descricao: "user",
        },
        {
            id: 2,
            descricao: "moderator",
        },
        {
            id: 3,
            descricao: "admin",
        },
    ]);
    models.tipos_capa.bulkCreate([
        {
            id_tipos_capa: 1,
            descricao: "Papel",
        },
        {
            id_tipos_capa: 2,
            descricao: "PVC",
        },
    ]);
     models.tipos_copia.bulkCreate([
        {
            id_tipos_copia: 1,
            descricao: "P&B",
        },
        {
            id_tipos_copia: 2,
            descricao: "Colorida",
        },
    ]);
    await models.servico.bulkCreate([
        {
            id_servico: 1,
            descricao: "Preto&Branco - Tamanho A5",
            quantidade: 15000,
            valor_unitario: 0.06
        },
        {
            id_servico: 2,
            descricao: "Preto&Branco - Tamanho A4",
            quantidade: 4000000,
            valor_unitario: 0.024
        },
        {
            id_servico: 3,
            descricao: "Preto&Branco - Tamanho A3",
            quantidade: 4000,
            valor_unitario: 0.15
        },
        {
            id_servico: 4,
            descricao: "Colorida - Tamanho A4",
            quantidade: 4000,
            valor_unitario: 0.1
        },
        {
            id_servico: 5,
            descricao: "Preto&Branco - Red/Ampliada",
            quantidade: 100,
            valor_unitario: 0.3
        },
        {
            id_servico: 6,
            descricao: "Capa em papel 150g e 2 grampos laterais",
            quantidade: 4000,
            valor_unitario: 0.07
        },
        {
            id_servico: 7,
            descricao: "Capa em papel 150g e 2 grampos a cavalo",
            quantidade: 1000,
            valor_unitario: 0.05
        },
        {
            id_servico: 8,
            descricao: "Capa em papel 150g e espirais de plástico",
            quantidade: 100,
            valor_unitario: 0.5
        },
        {
            id_servico: 9,
            descricao: "Capa em PVC e espirais de plástico",
            quantidade: 30000,
            valor_unitario: 0.45
        },
       
    ]);
    console.log("\n(||||||||| | | -------- Registros Inseridos com sucesso!!! -------- | | |||||||||)")
}
