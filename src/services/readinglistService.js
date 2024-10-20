const { UserBlogs } = require("../models");

const addBlogToReadingList = ({ blogId, userId }) => UserBlogs.create({ blogId, userId });

module.exports = {
  addBlogToReadingList,
};
