const express = require("express");
const {
  getAllContact,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/index.js");
const validateBody = require("../../helpers/validateBody.js");
const {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("../../schemas/contactsSchemas/contactsSchemas.js");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContact);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

module.exports = contactsRouter;
