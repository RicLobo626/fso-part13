const { Blog } = require("../models");

const findBlog = (id) => Blog.findByPk(id);

const findBlogs = () => Blog.findAll();

const createBlog = (body) => Blog.create(body);

const likeBlog = async (blog, body) => {
  const { likes } = body;

  blog.likes = likes;

  await blog.save();

  return blog;
};

const destroyBlog = (blog) => blog.destroy();

module.exports = { findBlog, findBlogs, createBlog, likeBlog, destroyBlog };
