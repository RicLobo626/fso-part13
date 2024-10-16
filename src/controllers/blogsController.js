const service = require("../services/blogService");

const getBlogs = async (_req, res) => {
  const blogs = await service.findBlogs();

  res.json(blogs);
};

const createBlog = async (req, res) => {
  const userId = req.user.id;
  const blog = await service.createBlog({ ...req.body, userId });

  res.status(201).json(blog);
};

const likeBlog = async (req, res) => {
  const blog = await service.likeBlog(req.blog, req.body);

  res.json(blog);
};

const deleteBlog = async (req, res) => {
  await service.destroyBlog(req.blog, req.user);

  res.status(204).end();
};

module.exports = {
  getBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
};
