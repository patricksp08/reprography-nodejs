const { verifySignUp } = require("../middlewares/");
const controller = require("../controllers/auth-controller");
const upload = require("../middlewares/upload");


module.exports = function (app) {
  // app.use(function (req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });

  app.post(
    "/auth/signup", upload.single('imagem_cliente'),
    [
      verifySignUp.checkDuplicateNifOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/auth/signin", controller.signin);
};