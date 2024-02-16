const { controllerWrapper } = require("../helpers/controllerWrapper");
const createContact = require("./createContact");
const getAllContact = require("./getAllContact");
const getOneContact = require("./getOneContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  createContact,
  getAllContact,
  getOneContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
