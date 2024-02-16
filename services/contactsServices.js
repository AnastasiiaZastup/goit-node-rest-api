const { HttpError } = require("../helpers");
const Contact = require("../models/contactsModels/contacts");

async function listContacts(filter, skip, limit) {
  return await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
}

async function getContactById(contactId, ownerId) {
  if (contactId.length === 24) {
    return await Contact.findOne({ _id: contactId, owner: ownerId });
  }
  throw HttpError(404);
}

async function removeContact(ownerId, contactId) {
  if (contactId.length === 24) {
    return await Contact.findOneAndDelete({ _id: contactId, owner: ownerId });
  }
  throw HttpError(404);
}

async function addContact({ name, email, phone, favorite, owner }) {
  return await Contact.create({ name, email, phone, favorite, owner });
}

async function updateContact(ownerId, id, data) {
  if (id.length === 24) {
    return await Contact.findOneAndUpdate(
      {
        _id: id,
        owner: ownerId,
      },
      data,
      { new: true }
    );
  }
  throw HttpError(404);
}

async function updateStatusContact(ownerId, contactId, body) {
  if (contactId.length === 24) {
    return await Contact.findOneAndUpdate(
      {
        _id: contactId,
        owner: ownerId,
      },
      body,
      { new: true }
    );
  }
  throw HttpError(404);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
