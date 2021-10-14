const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const upload = require("./upload");
const verifyService = require("./verifyService")
const verifyDesc = require("./verifyDesc")

module.exports = {
  authJwt,
  verifySignUp,
  upload,
  verifyService,
  verifyDesc
};