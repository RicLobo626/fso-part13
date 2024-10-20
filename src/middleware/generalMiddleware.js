const morgan = require("morgan");
const { SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

morgan.token("body", (req) => JSON.stringify(req.body));

const requestLogger = morgan(":method :url :body :status :res[content-length] - :response-time ms");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  switch (error.name) {
    case "ValidationError":
    case "SequelizeDatabaseError":
      return res.status(400).json({ error: error.message });
    case "SequelizeValidationError":
      return res.status(400).json({ error: error.errors.map((e) => e.message) });
    case "NotFoundError":
      return res.status(404).json({ error: error.message });
    case "UnauthorizedError":
      return res.status(401).json({ error: error.message });
    case "SequelizeUniqueConstraintError":
      return res.status(400).json({ error: "This entry already exists" });
    default:
      next(error);
  }
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.slice(7);
  } else {
    return res.status(401).json({ error: "Token missing" });
  }

  next();
};

const userExtractor = async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.token, SECRET);
    req.user = await userService.findUserById(id);
  } catch (e) {
    return res.status(401).json({ error: "Token invalid" });
  }

  next();
};

module.exports = { unknownEndpoint, errorHandler, requestLogger, tokenExtractor, userExtractor };
