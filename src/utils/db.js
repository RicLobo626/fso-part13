const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL);

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database");
  } catch (e) {
    console.log("Failed to connect to the database: ", e);
    process.exit(1);
  }
};

module.exports = { sequelize, connectToDb };
