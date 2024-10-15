const { ValidationError, NotFoundError } = require("../utils/customErrors");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const findUsers = () => User.findAll();

const createUser = async (body) => {
  const { password, ...rest } = body;

  const pwdMinLength = 3;

  if (!password || password.length < pwdMinLength) {
    throw new ValidationError("Password must be at least 3 characters long");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  return User.create({ ...rest, passwordHash });
};

const updateUser = async (username, body) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  await user.update(body);

  return user;
};

module.exports = {
  findUsers,
  createUser,
  updateUser,
};
