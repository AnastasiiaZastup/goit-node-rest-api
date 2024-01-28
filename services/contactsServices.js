// contacts.js

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "../db/contacts.json");

const listContacts = async () => {
  const listAll = await fs.readFile(contactsPath);
  return JSON.parse(listAll);
};

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contact = await listContacts();
  const contactsIndex = contact.findIndex((item) => item.id === contactId);
  if (contactsIndex === -1) {
    return null;
  }
  const [deleted] = contact.splice(contactsIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return deleted;
};

const addContact = async (name, email, phone) => {
  const contact = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return newContact;
};

const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  console.log(Object.keys(data));
  if (Object.keys(data).length === 0) {
    throw HttpError(400);
  }
  contacts[index] = {
    id,
    name: data.name || contacts[index].name,
    email: data.email || contacts[index].email,
    phone: data.phone || contacts[index].phone,
  };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};
module.exports = {
  addContact,
  getContactById,
  removeContact,
  listContacts,
  updateContact,
};
