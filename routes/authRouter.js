const express = require("express");
const {
  register,
  login,
  logout,
  getCurrent,
} = require("../controllers/authController.js");
const validateBody = require("../helpers/validateBody.js");
const {
  registerSchema,
  loginSchema,
} = require("../schemas/authValidationSchema.js");
const authMiddleware = require("../middleWares/authMiddleWare.js");

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.post("/logout", authMiddleware, logout);
authRouter.get("/current", authMiddleware, getCurrent);

module.exports = authRouter;
