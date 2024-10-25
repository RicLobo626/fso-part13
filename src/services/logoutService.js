const { Session } = require("../models");

const logout = async (token) => Session.destroy({ where: { token } });

module.exports = { logout };
