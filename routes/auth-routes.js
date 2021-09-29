const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares/");
const controller = require("../controllers/auth-controller");
const upload = require("../middlewares/upload");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "accessToken, Origin, Content-Type, Accept"
    );
    next();
  });

  //GET
  //Rota para verificar se o usuário está logado (validateToken do Middleware AuthMiddleware)
  app.get("/auth", [authJwt.validateToken], (req, res) => {
    res.json(req.user);
  });


  //POST
  app.post(
    "/auth/signup", upload.single('imagem_cliente'),
    [
      authJwt.validateToken, 
      verifySignUp.checkDuplicateNifOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/auth/signin", controller.signin);

};