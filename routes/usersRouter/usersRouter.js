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
const { authMiddleware } = require("../../middleWares/authMiddleWare");
const upload = require("../../middleWares/upload");
const userSchema = require("../../schemas/usersSchemas/usersSchemas");

router.post("/register", validateBody(userSchema), registration);

router.post("/login", validateBody(userSchema), login);

router.post("/logout", authMiddleware, logout);

router.get("/current", authMiddleware, getInfo);

router.patch("/", authMiddleware, updateSubscription);

router.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);

module.exports = router;
