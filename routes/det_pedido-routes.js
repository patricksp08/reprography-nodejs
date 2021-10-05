const { validateToken } = require("../middlewares/authJwt");
const controller = require("../controllers/det_pedido-controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "accessToken, Origin, Content-Type, Accept"
    );
    next();
  });
};