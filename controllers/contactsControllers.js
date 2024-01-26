const contactsService = require("../services/contactsServices.js");
const HttpError = require("../helpers/HttpError.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.getAllContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw requestError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw requestError(404);
    }
    res.json({ result });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    naxt(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const result = await contactsService.updateContact({
      id,
      name,
      email,
      phone,
    });
    if (!result) {
      throw requestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
