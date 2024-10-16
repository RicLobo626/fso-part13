const express = require("express");
require("express-async-errors");
const { blogsRouter, usersRouter, loginRouter } = require("./routes");
const middleware = require("./middleware/generalMiddleware");

const app = express();

app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
