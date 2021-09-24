const authJwt = require("./AuthMiddleware");
const verifySignUp = require("./verifySignUp");
const uploadFile = require("./upload");

module.exports = {
  authJwt,
  verifySignUp,
  uploadFile
};