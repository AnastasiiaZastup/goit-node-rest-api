const { HttpError } = require("../../helpers");
const User = require("../../models/usersModels/users");
const sendEmail = require("../../helpers/sendEmail");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyToken = user.verifyToken;

  const verifyEmail = {
    to: email,
    subject: "Please confirm your email",
    html: `<a href="${BASE_URL}/users/verify/${verifyToken}">Submit email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
