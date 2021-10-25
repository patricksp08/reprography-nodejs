const { authJwt } = require("../middlewares")
const controller = require("../controllers/servico-controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "accessToken, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/servicos", [authJwt.validateToken, authJwt.isAdmin], controller.servicosGet)
  
  app.put("/servicos/:id", [authJwt.validateToken, authJwt.isAdmin], controller.servicosPut)
  
};