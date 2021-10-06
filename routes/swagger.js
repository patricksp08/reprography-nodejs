const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../config/swagger.json");

module.exports = function (app) {
  //Swagger Rota
  app.use("/docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

};