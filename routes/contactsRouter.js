const express = require("express");
const contactsControllers = require("../controllers/contactsControllers.js");
const validateBody = require("../helpers/validateBody.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

module.exports = contactsRouter;
