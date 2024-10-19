const { PORT } = require("./utils/config");
const { runMigrations } = require("./utils/db");
const app = require("./app");

const start = async () => {
  await runMigrations();
  app.listen(PORT, async () => console.log(`Server is running. http://localhost:${PORT}`));
};

start();
