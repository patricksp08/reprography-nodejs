const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('servicoCapaAcabamento', {
    id_servicoCA: {
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
    tableName: 'servicoCapaAcabamento',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_servicoCA" },
        ]
      },
    ]
  });
};
