const Blog = require("./Blog");
const User = require("./User");

User.hasMany(Blog);
Blog.belongsTo(User);

User.sync({ alter: true });
Blog.sync({ alter: true });

module.exports = { Blog };
