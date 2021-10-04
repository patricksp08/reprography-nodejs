//Arquivo de configuração
const config = require("../config/auth.config");

//Método que verifica o token enviado na requisição com o token e a palavra de segurança setada no back-end
const { verify } = require("jsonwebtoken");

//Verifica se a requisição contém os valores setados no config.header e no config.secret
const validateToken = (req, res, next) => {
  const accessToken = req.header(config.header);

  if (!accessToken) return res.status(403).json({ error: "Você não está logado!" });

  const validToken = verify(accessToken, config.secret);
  req.user = validToken; //  ==>  //Aqui ele passa os dados do usuário, nif: ... , email: ... 
                          //Importante para usarmospor exemplo quando alguém realizar um pedido, 
                          //para sabermos quem foi que realizou aquele pedido.
  if (validToken) {
    return next();
  }
};

//Inicializando as models e as recebendo
// const {initModels} = require("../models/init-models")
// var { usuario } = initModels(sequelize)

//Testando forma de autenticar o perfil do usuário (admin, user, moderator)
// const db = require("../models");
// const User = db.user;

//Como está retornando como nulo quando faço o teste (comentando a const validToken) deixei comentado
//para arrumarmos depois com mais calma. 

//Mas basicamente, as funções isAdmin, isUser, etc encontram um registro na tabela de usuarios 
//com o ID passado pelo UserID, e se encontrado ele chama o método getRoles(), que tá ficando como
//indefinido... Ai depois ele percorreria a array de dados que é a roles e se na coluna descrição
//tivesse o campo requisitado, ai ele passaria, se não, falaria que você não tem permissão para
//acessar aquele tipo de informação/requisição.

//   verify(accessToken, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({
//         message: "Unauthorized!"
//       });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

// isAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].descricao === "admin") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Admin Role!"
//       });
//       return;
//     });
//   });
// };

// isModerator = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].descricao === "moderator") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator Role!"
//       });
//     });
//   });
// };

// isModeratorOrAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//     user.getRoles().then(roles => {
//       for (let i = 0; i < roles.length; i++) {
//         if (roles[i].descricao === "moderator") {
//           next();
//           return;
//         }

//         if (roles[i].descricao === "admin") {
//           next();
//           return;
//         }
//       }

//       res.status(403).send({
//         message: "Require Moderator or Admin Role!"
//       });
//     });
//   });
// };


const authJwt = {
  validateToken: validateToken,
  // isAdmin: isAdmin,
  // isModerator: isModerator,
  // isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;