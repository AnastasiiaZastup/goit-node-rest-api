const router = require("express").Router();
const {
  registration,
  login,
  logout,
  getInfo,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/usersController");
const { validateBody } = require("../../helpers");
const { authMiddleware, upload } = require("../../middleWares");
const userSchema = require("../../schemas/usersSchemas/usersSchemas");

router.post("/register", validateBody(userSchema), registration);

router.post("/login", validateBody(userSchema), login);

router.post("/logout", authMiddleware, logout);

router.get("/current", authMiddleware, getInfo);

router.patch("", authMiddleware, validateBody(userSchema), updateSubscription);

router.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);

module.exports = router;
