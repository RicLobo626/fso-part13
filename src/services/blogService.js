const { Blog } = require("../models");
const { UnauthorizedError } = require("../utils/customErrors");

const findBlog = (id) => Blog.findByPk(id);

const findBlogs = () => Blog.findAll();

const createBlog = (body) => Blog.create(body);

const likeBlog = async (blog, body) => {
  const { likes } = body;

  blog.likes = likes;

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
