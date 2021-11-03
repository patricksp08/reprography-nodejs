//Arquivo de configuração
const config = require("../.config/auth.config");
//Método que verifica o token enviado na requisição com o token e a palavra de segurança setada no back-end
const { verify } = require("jsonwebtoken");

// Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { usuario } = initModels(sequelize);

//Verifica se a requisição contém os valores setados no config.header e no config.secret
const validateToken = (req, res, next) => {
  const accessToken = req.header(config.jwt.header);

  if (!accessToken) {
    res.status(403).json({ error: "Você não está logado!" });
    return;
  }
  try {
    const validToken = verify(accessToken, config.jwt.secret);
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (error) {
    res.json({ error })
  }
  //  ==>  //Aqui ele passa os dados do usuário, nif: ... , email: ... 
  //Importante para usarmospor exemplo quando alguém realizar um pedido, 
  //para sabermos quem foi que realizou aquele pedido.
};

isAdmin = (req, res, next) => {
  usuario.findByPk(req.user.nif).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].descricao === "admin") {
          if(next){
            next();
            return;
          }
          else{
            req.status = 200;
            return;
          }


        }
      }
      // res.redirect("/teste");
      return res.status(403).json({
        message: "Você precisa ser Administrador para executar essa ação!"
      });
    });
  });
};

const authJwt = {
  validateToken: validateToken,
  isAdmin: isAdmin,
};

module.exports = authJwt;