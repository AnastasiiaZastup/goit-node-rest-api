const User = require("../../models/usersModels/users");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { sendEmail, HttpError } = require("../../helpers");
const { BASE_URL } = process.env;
const uuid = require("uuid");

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);
  const verifyToken = uuid.v4();

  try {
    const result = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verifyToken,
    });
    sendEmail({
      to: email,
      subject: "Please confirm your email",
      html: `<a href="${BASE_URL}/users/verify/${verifyToken}">Submit email</a>`,
    });
    res.status(201).json({
      id: result._id,
      subscription: result.subscription,
      email,
      avatarURL,
    });
  } catch (error) {
    if (error.code === 11000) {
      throw HttpError(409, "Email in use");
    }
    throw error;
  }
};

module.exports = registration;
