const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    nif: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    senha: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    telefone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    id_depto: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_tipo_usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'tipo_usuario',
        key: 'id_tipo_usuario'
      }
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cdf: {
      type: DataTypes.STRING(7),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "id_tipo_usuario",
        using: "BTREE",
        fields: [
          { name: "id_tipo_usuario" },
        ]
      },
    ]
  });
};
