class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends Error {
  constructor(message = "Validation error") {
    super(message);
    this.name = this.constructor.name;
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
};
