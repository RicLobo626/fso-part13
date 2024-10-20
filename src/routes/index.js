const blogs = require("./blogsRouter");
const users = require("./usersRouter");
const login = require("./loginRouter");
const authors = require("./authorsRouter");
const readinglists = require("./readinglistsRouter");

module.exports = { blogs, users, readinglists, authors, login };
