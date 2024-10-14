const { Blog } = require("../models");

const findBlog = (id) => Blog.findByPk(id);

const findBlogs = () => Blog.findAll();

const createBlog = (body) => Blog.create(body);

const destroyBlog = (blog) => blog.destroy();

module.exports = { findBlog, findBlogs, createBlog, destroyBlog };
