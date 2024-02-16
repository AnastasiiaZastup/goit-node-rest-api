const User = require("../../models/usersModels/users");
const HttpError = require("../../helpers/HttpError");

const logout = async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user || !user.token) {
    throw HttpError(401, "Not authorized");
  }

  await User.updateOne({ _id: id }, { $unset: { token: "" } });

  res.status(204).json();
};

module.exports = logout;
