const User = require("../models/User");
const { Blog } = require("../models");
const { UnauthorizedError } = require("../utils/customErrors");
const { Op } = require("sequelize");

const findBlog = (id) => Blog.findByPk(id);

const findBlogs = ({ search }) => {
  const where = {};

  if (search) {
    const condition = { [Op.iLike]: `%${search}%` };
    where[Op.or] = [{ title: condition }, { author: condition }];
  }

  return Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["id", "name"],
    },
    where,
  });
};

const createBlog = (body) => Blog.create(body);

const likeBlog = async (blog, body) => {
  blog.likes = body.likes;

  await blog.save();

  return blog;
};

const destroyBlog = async (blog, user) => {
  if (blog.userId !== user.id) {
    throw new UnauthorizedError("You don't have permission to delete this blog");
  }

  await blog.destroy();
};

module.exports = { findBlog, findBlogs, createBlog, likeBlog, destroyBlog };
