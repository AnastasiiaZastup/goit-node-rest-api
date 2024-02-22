const { HttpError } = require("../../helpers");
const User = require("../../models/usersModels/users");

const verifyEmail = async (req, res, next) => {
  try {
    const { verifyToken } = req.params;
    const user = await User.findOne({ verifyToken });
    if (!user) {
      throw HttpError(404, "User not found!");
    }
    await User.findByIdAndUpdate(user._id, {
      verified: true,
      verifyToken: null,
    });
    res.json({ message: "Verification successful!" });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
