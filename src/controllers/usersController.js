const service = require("../services/userService");

const createUser = async (req, res) => {
  const user = await service.createUser(req.body);

  res.status(201).json(user);
};

const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await service.findUserById(id, req.query);

  res.json(user);
};

const getUsers = async (_req, res) => {
  const users = await service.findUsers();

  res.json(users);
};

const updateUsername = async (req, res) => {
  const currentUsername = req.params.username;
  const username = req.body.username;

  const user = await service.updateUser(currentUsername, { username });

  res.json(user);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUsername,
};
