const express = require("express");
require("express-async-errors");
const routes = require("./routes");
const middleware = require("./middleware/generalMiddleware");

const app = express();

app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/login", routes.login);
app.use("/api/blogs", routes.blogs);
app.use("/api/users", routes.users);
app.use("/api/authors", routes.authors);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
