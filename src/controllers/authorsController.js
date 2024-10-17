const service = require("../services/blogService");

const getAuthors = async (req, res) => {
  const authors = await service.findAuthorStats();

  res.json(authors);
};

module.exports = {
  getAuthors,
};
