const router = require("express").Router();
const {
  registration,
  login,
  logout,
  getInfo,
  updateSubscription,
} = require("../../controllers/usersController");
const { validateBody } = require("../../helpers");
const { authMiddleware } = require("../../middleWares/authMiddleWare");
const userSchema = require("../../schemas/usersSchemas/usersSchemas");

router.post("/register", validateBody(userSchema), registration);

router.post("/login", validateBody(userSchema), login);

router.post("/logout", authMiddleware, logout);

router.get("/current", authMiddleware, getInfo);

router.patch("", authMiddleware, updateSubscription);

module.exports = router;
