const contactsServices = require("../services/contactsServices");

const getAllContact = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;

  const filter = favorite === null ? { owner } : { favorite, owner };
  const result = await contactsServices.listContacts(filter, skip, limit);

  res.json(result);
};

module.exports = getAllContact;
