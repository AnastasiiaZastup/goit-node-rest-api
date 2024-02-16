const jwt = require("jsonwebtoken");
const User = require("../../models/usersModels/users");
const { JWT_SECRET } = process.env;

const upSubscription = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  const { id } = jwt.verify(token, JWT_SECRET);
  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  const { email, subscription } = updatedUser;
  res.json({ email, subscription });
};

module.exports = upSubscription;
