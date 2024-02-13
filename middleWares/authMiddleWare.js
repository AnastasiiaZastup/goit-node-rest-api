const User = require("../schemas/usersSchema.js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/HttpError.js");

dotenv.config();

const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return next(HttpError(401, "Not authorized"));
  }

  if (!token) {
    return next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    user.token = token;

    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401, "Not authorized"));
    }

    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return next(HttpError(401, "Not authorized"));
    }
    throw error;
  }
  next();
};

module.exports = authMiddleware;
