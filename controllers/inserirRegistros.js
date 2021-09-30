const { initModels } = require("../models/init-models")
var models = initModels(sequelize)

exports.Initial = async () => {
    models.acabamento.bulkCreate([
        {
            id_acabamento: 1,
            descricao: "Papel 2 grampos laterais"
        },
        {
            id: 2,
            descricao: "Papel 2 grampos a cavalo"
        },
        {
            id_acabamento: 3,
            descricao: "Espiral de plástico"
        }
    ]);
    models.avaliacao_pedido.bulkCreate([
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
    models.departamento.bulkCreate([
        {
            id_depto: 1,
            descricao: "Informática",
        },
        {
            id_depto: 2,
            descricao: "Mecânica",
        },
    ]);
    models.curso.bulkCreate([
        {
            id_curso: 1,
            descricao: "CT-DS",
            id_depto: 1
        },
        {
            id_curso: 2,
            descricao: "CT-MP",
            id_depto: 2
        },
        {
            id_curso: 3,
            descricao: "CST-MP",
            id_depto: 2
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
    await models.tipos_copia.bulkCreate([
        {
            id_tipos_copia: 1,
            descricao: "P&B",
        },
        {
            id_tipos_copia: 2,
            descricao: "Color",
        },
    ]);
      console.log("\n(||||||||| | | -------- Registros Inseridos com sucesso!!! -------- | | |||||||||)")
}
