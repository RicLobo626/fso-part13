const service = require("../services/logoutService");

const logout = async (req, res) => {
  await service.logout(req.token);

  res.status(204).end();
};

module.exports = { logout };
