const service = require("../services/blogService");

const blogFinder = async (req, res, next) => {
  const id = req.params.id;

  req.blog = await service.findBlog(id);

  if (req.blog) {
    next();
  } else {
    res.status(404).json({ error: "Blog not found" });
  }
};

module.exports = { blogFinder };
