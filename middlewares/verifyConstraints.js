const { initModels } = require("../models/init-models");
const { sequelize } = require("../models");
var models = initModels(sequelize);

<<<<<<< HEAD
const verify = (req,res) => {
    if(req.pedidos){
        console.log(req.pedidos)
    }
}
=======

const verify = (req, res) => {
    
}

module.exports = verify
>>>>>>> 3f8bba16a8cdf83ed68cba2673ccfe286883e7f8
