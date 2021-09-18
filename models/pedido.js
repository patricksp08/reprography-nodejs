const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const pedido =  sequelize.define('pedido', {
    id_pedido: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    id_centro_custos: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'centro_custos',
        key: 'id_centro_custos'
      }
    },
    dt_pedido: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nif: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'nif'
      }
    },
    titulo_pedido: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    custo_total: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    id_modo_envio: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'modo_envio',
        key: 'id_modo_envio'
      }
    },
    id_avaliacao_pedido: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'avaliacao_pedido',
        key: 'id_avaliacao_pedido'
      }
    },
    id_curso: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'curso',
        key: 'id_curso'
      }
    },
    observacoes: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }, {
    sequelize,
    tableName: 'pedido',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pedido" },
        ]
      },
      {
        name: "nif",
        using: "BTREE",
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "id_modo_envio",
        using: "BTREE",
        fields: [
          { name: "id_modo_envio" },
        ]
      },
      {
        name: "id_avaliacao_pedido",
        using: "BTREE",
        fields: [
          { name: "id_avaliacao_pedido" },
        ]
      },
      {
        name: "id_curso",
        using: "BTREE",
        fields: [
          { name: "id_curso" },
        ]
      },
      {
        name: "pedido_ibfk_3",
        using: "BTREE",
        fields: [
          { name: "id_centro_custos" },
        ]
      },
    ]
  });
  return pedido;
};
