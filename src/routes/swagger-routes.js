const swaggerUi = require("swagger-ui-express");
const swaggerDocsV1 = require("../../info_api/documentacao/swagger/v1/swaggerV1.config.json");
const swaggerDocsV2 = require("../../info_api/documentacao/swagger/v2/swaggerV2.config.json");

module.exports = function (app) {
  //Swagger Routes

  //Versão 1
  app.use("/docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerDocsV1));

  //Versão 2 (falta comentar alguns campos, como na versão 1)
  app.use("/docs/v2", swaggerUi.serve, swaggerUi.setup(swaggerDocsV2));
};
