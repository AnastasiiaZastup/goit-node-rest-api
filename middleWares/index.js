const controllerWrapper = require("../helpers/controllerWrapper");
const authMiddleware = require("./authMiddleWare");
const upload = require("./upload");

module.exports = {
  authMiddleware: controllerWrapper(authMiddleware),
  upload,
};
