const service = require("../services/readinglistService");

const addBlogToReadingList = async (req, res) => {
  console.log(req.body);
  const addedEntry = await service.addBlogToReadingList(req.body);

  res.status(201).json(addedEntry);
};

module.exports = {
  addBlogToReadingList,
};
