const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('det_pedido', {
    id_det_pedido: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    id_pedido: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    num_copias: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    num_paginas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_tipos_copia: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'tipos_copia',
        key: 'id_tipos_copia'
      }
    },
    id_acabamento: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'acabamento',
        key: 'id_acabamento'
      }
    },
    id_tamanho_pagina: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'tamanho_pagina',
        key: 'id_tamanho_pagina'
      }
    },
    id_tipos_capa: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'tipos_capa',
        key: 'id_tipos_capa'
      }
    }
  }, {
    sequelize,
    tableName: 'det_pedido',
    timestamps: false,
    indexes: [
      {
        name: "id_tipos_copia",
        using: "BTREE",
        fields: [
          { name: "id_tipos_copia" },
        ]
      },
      {
        name: "id_acabamento",
        using: "BTREE",
        fields: [
          { name: "id_acabamento" },
        ]
      },
      {
        name: "id_tamanho_pagina",
        using: "BTREE",
        fields: [
          { name: "id_tamanho_pagina" },
        ]
      },
      {
        name: "id_tipos_capa",
        using: "BTREE",
        fields: [
          { name: "id_tipos_capa" },
        ]
      },
    ]
  });
};
