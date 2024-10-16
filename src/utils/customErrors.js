class CustomError extends Error {
  constructor(message = "An error occurred") {
    super(message);
    this.name = this.constructor.name;
  }
}

class NotFoundError extends CustomError {
  constructor(message = "Not found") {
    super(message);
  }
}

class ValidationError extends CustomError {
  constructor(message = "Validation error") {
    super(message);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message);
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
};
