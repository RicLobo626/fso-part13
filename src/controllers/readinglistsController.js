const service = require("../services/readinglistService");

const addBlogToReadingList = async (req, res) => {
  const addedEntry = await service.addBlogToReadingList(req.body);

  res.status(201).json(addedEntry);
};

const toggleRead = async (req, res) => {
  const entry = await service.toggleRead(req.params.id, req.user.id, req.body.read);

  res.status(200).json(entry);
};

module.exports = {
  addBlogToReadingList,
  toggleRead,
};
