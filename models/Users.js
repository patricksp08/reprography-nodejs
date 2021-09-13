module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
      id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
	  email: {
		  type: DataTypes.STRING,
		  allowNull: false,
	  },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departament: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gerencia: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
		    defaultValue: 0
      },
      image_user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    return users;
  };