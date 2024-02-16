const HttpError = require("../helpers/HttpError");
const controllerWrapper = require("../helpers/controllerWrapper");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModels/users");
const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw HttpError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw HttpError(401, error.message);
    }
    throw error;
  }
  next();
};

module.exports = { authMiddleware: controllerWrapper(authMiddleware) };
