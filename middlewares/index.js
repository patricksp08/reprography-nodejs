const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const uploadImage = require("./uploadImage");
const uploadFile = require('./uploadFile')
const verifyService = require("./verifyService")

module.exports = {
  authJwt,
  verifySignUp,
  uploadImage,
  uploadFile,
  verifyService
};