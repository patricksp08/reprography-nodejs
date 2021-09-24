const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateNifOrEmail = (req, res, next) => {
  // NIF
  User.findOne({
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
    User.findOne({
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

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for(let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Error! Role inexistente = " + req.body.roles[i]
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