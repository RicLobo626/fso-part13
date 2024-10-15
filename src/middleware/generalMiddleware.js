const morgan = require("morgan");

morgan.token("body", (req) => JSON.stringify(req.body));

const requestLogger = morgan(":method :url :body :status :res[content-length] - :response-time ms");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  switch (error.name) {
    case "NotFoundError":
      return res.status(404).json({ error: error.message });
    case "ValidationError":
    case "SequelizeValidationError":
      return res.status(400).json({ error: error.message });
    case "SequelizeDatabaseError":
      return res.status(400).json({ error: error.message });

    default:
      next(error);
  }
};

module.exports = { unknownEndpoint, errorHandler, requestLogger };
