const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('servicoCopiaTamanho', {
    id_servicoCT: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descricao: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    quantidade: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    valor_unitario: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ativado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'servicoCopiaTamanho',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_servicoCT" },
        ]
      },
    ]
  });
};
