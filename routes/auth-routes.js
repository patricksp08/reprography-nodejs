const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares/");
const controller = require("../controllers/auth-controller");
const { uploadImage } = require("../middlewares/");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "accessToken, Origin, Content-Type, Accept"
    );
    next();
  });

  //POST
  app.post(
    "/auth/signup", uploadImage.single('imagem'),
    [
      authJwt.validateToken,
      authJwt.isAdmin,
      verifySignUp.checkDuplicateNifOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/auth/signin", controller.signin);

};