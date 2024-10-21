const service = require("../services/readinglistService");

const addBlogToReadingList = async (req, res) => {
  const addedEntry = await service.addBlogToReadingList(req.body);

  res.status(201).json(addedEntry);
};

module.exports = {
  addBlogToReadingList,
};
