const contactsServices = require("../services/contactsServices");
const { HttpError } = require("../helpers/HttpError");

const updateContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsServices.updateContact(owner, _id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateContact;
