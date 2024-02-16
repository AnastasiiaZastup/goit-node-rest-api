const { HttpError } = require("../helpers/HttpError");
const contactsServices = require("../services/contactsServices");

const getOneContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsServices.getContactById(_id, owner);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = getOneContact;
