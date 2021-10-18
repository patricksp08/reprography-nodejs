const { initModels } = require("../models/init-models");
const { sequelize } = require("../models");
var models = initModels(sequelize);

const verify = (req,res) => {
    if(req.pedidos){
        console.log(req.pedidos)
    }
}