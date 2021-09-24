const sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const acabamento = sequelize.define('acabamento', {
    id_acabamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descricao: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'acabamento',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_acabamento" },
        ]
      },
    ]
  });
  return acabamento;
};
