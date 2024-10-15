const express = require("express");
require("express-async-errors");
const blogsRouter = require("./routes/blogsRouter");
const middleware = require("./middleware/generalMiddleware");

const app = express();

app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
