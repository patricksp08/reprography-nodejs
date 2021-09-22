const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_usuario', {
    id_tipo_usuario: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    descricao: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tipo_usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tipo_usuario" },
        ]
      },
    ]
  });
};
