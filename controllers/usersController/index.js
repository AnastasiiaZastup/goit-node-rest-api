const { controllerWrapper } = require("../../helpers");
const getInfo = require("./getInfo");
const login = require("./login");
const logout = require("./logout");
const registration = require("./registration");
const upSubscription = require("./upSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  registration: controllerWrapper(registration),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  getInfo: controllerWrapper(getInfo),
  updateSubscription: controllerWrapper(upSubscription),
  updateAvatar: controllerWrapper(updateAvatar),
};
