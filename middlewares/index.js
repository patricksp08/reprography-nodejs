const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const upload = require("./upload");
const service = require("./verifyService")
const verifyDesc = require("./verifyDesc")

module.exports = {
  authJwt,
  verifySignUp,
  upload,
  service,
  verifyDesc
};