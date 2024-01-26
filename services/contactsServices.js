// contacts.js

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const listAll = await fs.readFile(contactsPath, "utf-8");
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

const updateContact = async (id, contact) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) return null;
  allContacts[index] = {
    name,
    email,
    phone,
  };
  await fs.writeFile(path, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

module.exports = {
  addContact,
  getContactById,
  removeContact,
  listContacts,
  updateContact,
};
