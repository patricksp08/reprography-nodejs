const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../config/swagger.json");

//Inicio da tentativa JWT Auth | https://poopcode.com/add-jwt-authentication-to-your-swagger-api-docs/
const express = require("express");
const app = express();
//Other code (<= não sei)
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsdoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger API Tutorial - Poopcode.com",
      version: "1.0.0",
      description:
        "A sample project to understand how easy it is to document and Express API",
    }
  },
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT"
        },
      }
    }
    ,
    security: [{
      jwt: []
    }],
  swagger: "2.0",
});
//Fim da tentativa JWT Auth

module.exports = function (app) {
  //Swagger Rota
    app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

};