const service = require("../services/blogService");

const getBlogs = async (_req, res) => {
  const blogs = await service.findBlogs();

  res.json(blogs);
};

const createBlog = async (req, res) => {
  const blog = await service.createBlog(req.body);

  res.status(201).json(blog);
};

const deleteBlog = async (req, res) => {
  await service.destroyBlog(req.blog);

  res.status(204).end();
};

module.exports = {
  getBlogs,
  createBlog,
  deleteBlog,
};
