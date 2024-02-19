const HttpError = require("../helpers/HttpError");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModels/users");
const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return next(new HttpError(401, "Not authorized"));
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return next(new HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return next(new HttpError(401, error.message));
    }
    return next(error);
  }
};

module.exports = authMiddleware;
