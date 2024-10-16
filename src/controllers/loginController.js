const service = require("../services/loginService");

const login = async (req, res) => {
  const { username, password } = req.body;

  const authData = await service.authenticate(username, password);

  res.json(authData);
};

module.exports = {
  login,
};
