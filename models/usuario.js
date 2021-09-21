const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const usuario = sequelize.define('usuario', {
    nif: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'departamento',
        key: 'id_depto'
      }
    },
    id_tipo_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_usuario',
        key: 'id_tipo_usuario'
      }
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "unique_email"
    },
    cfp: {
      type: DataTypes.STRING(7),
      allowNull: false
    },
    imagem: {
      type: DataTypes.STRING(255),
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
        name: "unique_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "id_tipo_usuario",
        using: "BTREE",
        fields: [
          { name: "id_tipo_usuario" },
        ]
      },
      {
        name: "id_depto",
        using: "BTREE",
        fields: [
          { name: "id_depto" },
        ]
      },
    ]
  });
  return usuario;
};
