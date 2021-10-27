const swaggerUi = require("swagger-ui-express");
<<<<<<< HEAD
const swaggerDocsV1 = require("../.config/swagger/v1/swaggerV1.config.json");
const swaggerDocsV2 = require("../.config/swagger/v2/swaggerV2.config.json");
=======
const swaggerDocsV1 = require("../../info_api/documentacao/swagger/v1/swaggerV1.config.json");
const swaggerDocsV2 = require("../../info_api/documentacao/swagger/v2/swaggerV2.config.json");
>>>>>>> 590ab0b4646f9fc692ad05026e0b6cab8e9cafd8

module.exports = function (app) {
  //Swagger Routes

<<<<<<< HEAD
  // //Versão 1
  app.use('/v1/docs', swaggerUi.serve, (...args) => swaggerUi.setup(swaggerDocsV1)(...args));
 
  //Versão 2 (falta comentar alguns campos, como na versão 1)
  app.use('/v2/docs', swaggerUi.serve, (...args) => swaggerUi.setup(swaggerDocsV2)(...args));

};
=======
  //Versão 1
  app.use("/docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerDocsV1));

  //Versão 2 (falta comentar alguns campos, como na versão 1)
  app.use("/docs/v2", swaggerUi.serve, swaggerUi.setup(swaggerDocsV2));
};
>>>>>>> 590ab0b4646f9fc692ad05026e0b6cab8e9cafd8
