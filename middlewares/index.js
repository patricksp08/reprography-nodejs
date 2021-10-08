const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const uploadImage = require("./uploadImage");
const uploadFile = require('./uploadFile')
const services = require("./services.js")

module.exports = {
  authJwt,
  verifySignUp,
  uploadImage,
  uploadFile,
  services
};