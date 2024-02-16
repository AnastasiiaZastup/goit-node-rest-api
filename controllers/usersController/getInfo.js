const HttpError = require("../../helpers/HttpError");
const User = require("../../models/usersModels/users");

const getInfo = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";

  const [type, token] = authHeader.split(" ");

  if (!token) {
    throw HttpError(401, "Not authorized");
  }

  const user = await User.findOne({ token: token });

  const { email, subscription } = user;

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  res.json({ email, subscription });
};

module.exports = getInfo;
