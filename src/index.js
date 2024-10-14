require("dotenv").config();
const { PORT } = require("./utils/config");
const { connectToDb } = require("./utils/db");
const app = require("./app");

const start = async () => {
  await connectToDb();
  app.listen(PORT, async () => console.log(`Server is running. http://localhost:${PORT}`));
};

start();
