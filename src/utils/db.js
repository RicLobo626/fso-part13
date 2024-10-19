const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./config");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(DATABASE_URL);

const migrator = new Umzug({
  migrations: {
    glob: "src/migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
});

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database");
  } catch (e) {
    console.log("Failed to connect to the database: ", e);
    process.exit(1);
  }
};

const runMigrations = async () => {
  await connectToDb();
  const migrations = await migrator.up();

  console.log("Migrations up to date", {
    files: migrations.map(({ name }) => name),
  });
};

const rollbackMigrations = async () => {
  await connectToDb();
  await migrator.down();
};

module.exports = { sequelize, runMigrations, rollbackMigrations };
