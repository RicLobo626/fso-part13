const { UserBlogs } = require("../models");
const { NotFoundError, UnauthorizedError } = require("../utils/customErrors");

const findEntry = (id) => UserBlogs.findByPk(id);

const addBlogToReadingList = ({ blogId, userId }) => UserBlogs.create({ blogId, userId });

const toggleRead = async (entryId, userId, isRead = false) => {
  const entry = await findEntry(entryId);

  if (!entry) {
    throw new NotFoundError("Entry not found");
  }

  if (entry.userId !== userId) {
    throw new UnauthorizedError("Unauthorized");
  }

  entry.read = isRead;

  const { id, read } = await entry.save();

  return { id, read };
};

module.exports = {
  addBlogToReadingList,
  toggleRead,
  findEntry,
};
