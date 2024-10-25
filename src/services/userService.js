const { ValidationError, NotFoundError } = require("../utils/customErrors");
const bcrypt = require("bcrypt");
const { Blog, User } = require("../models");
const { Op } = require("sequelize");

const findUsers = () => User.findAll({ include: { model: Blog, attributes: { exclude: ["userId"] } } });

const findUserByUsername = (username, scope = "defaultScope") => {
  return User.scope(scope).findOne({ where: { username } });
};

const findUserById = (id, query = {}, scope = "defaultScope") => {
  const statusWhere = {};

  if (query.read) {
    statusWhere.read = { [Op.eq]: query.read === "true" };
  }

  return User.scope(scope).findByPk(id, {
    include: [
      {
        model: Blog,
        attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      },
      {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
        through: {
          as: "status",
          attributes: ["read", "id"],
          where: statusWhere,
        },
      },
    ],
  });
};

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
  findUserById,
  findUserByUsername,
  createUser,
  updateUser,
};
