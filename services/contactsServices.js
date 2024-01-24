// contacts.js

const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const listAll = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(listAll);
}

async function getContactById(contactId) {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contact = await listContacts();
  const contactsIndex = contact.findIndex((item) => item.id === contactId);
  if (contactsIndex === -1) {
    return null;
  }
  const [deleted] = contact.splice(contactsIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return deleted;
}

async function addContact(name, email, phone) {
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
}

module.exports = {
  addContact,
  getContactById,
  removeContact,
  listContacts,
};
