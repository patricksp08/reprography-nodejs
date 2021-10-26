const swaggerUi = require("swagger-ui-express");
const swaggerDocsV1 = require("../.config/swagger/v1/swagger.config.json");
const swaggerDocsV2 = require("../.config/swagger/v2/swagger.config.json");

module.exports = function (app) {
  //Swagger Routes

  //Versão 1
  app.use("/docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerDocsV1));

  //Versão 2 (falta comentar alguns campos, como na versão 1)
  app.use("/docs/v2", swaggerUi.serve, swaggerUi.setup(swaggerDocsV2));
};