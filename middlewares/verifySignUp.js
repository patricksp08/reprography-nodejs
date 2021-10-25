const db = require("../models");
const sequelize = db.sequelize;
const ROLES = db.ROLES;

////Inicializando as models e recebendo nas configurando
const { initModels } = require("../models/init-models.js");
var models = initModels(sequelize);
usuario = models.usuario;

//Verifica se já existe um usuário com NIF e/ou email passados pelo input 
checkDuplicateNifOrEmail = (req, res, next) => {
  // NIF
  usuario.findOne({
    where: {
      nif: req.body.nif
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Error! Usuário já cadastrado!"
      });
      return;
    }

    // Email
    usuario.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Error! Email já cadastrado!"
        });
        return;
      }
      next();
    });
  });
};

//Verifica se o Cargo passado na hora do registro existe no back-end (existentes: User, Moderator, Admin)
checkRolesExisted = (req, res, next) => {

  //Transformando int em array para comparar se existe o Role em Models/Index.js. => ROLES
  var { roles } = req.body;
  if (roles == 1) {
    roles = ["admin"]
  }
  else {
    roles = ["user"]
  }

  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        res.status(400).send({
          message: "Error! Role inexistente = " + roles[i]
        });
        return
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateNifOrEmail: checkDuplicateNifOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;