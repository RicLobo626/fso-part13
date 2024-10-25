const Blog = require("./Blog");
const User = require("./User");
const UserBlogs = require("./UserBlogs");
const Session = require("./Session");

User.hasOne(Session);

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: UserBlogs, as: "readings" });
Blog.belongsToMany(User, { through: UserBlogs, as: "readers" });

module.exports = { Blog, User, UserBlogs, Session };
