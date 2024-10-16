const { SECRET } = require("../utils/config");
const { NotFoundError, ValidationError } = require("../utils/customErrors");
const userService = require("./userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authenticate = async (username, password) => {
  const user = await userService.findUser(username, "sensitive");

  if (!user) {
    throw new NotFoundError("Invalid username");
  }

  if (!password) {
    throw new ValidationError("Password is required");
  }

  const match = await bcrypt.compare(password.toString(), user.passwordHash);

  if (!match) {
    throw new ValidationError("Invalid password");
  }

  const tokenPayload = {
    username,
    id: user.id,
  };

  const token = jwt.sign(tokenPayload, SECRET);

  return { token, username, name: user.name };
};

module.exports = {
  authenticate,
};
