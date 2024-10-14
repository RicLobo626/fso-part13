require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./utils/config");

const sequelize = new Sequelize(config.DATABASE_URL);

const printBlogs = async () => {
  const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT });

  blogs.forEach(({ author, title, likes }) => {
    console.log(`${author || "Some author"}: '${title}', ${likes} likes`);
  });

  process.exit(1);
};

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await printBlogs();
  } catch (error) {
    console.error("Something went wrong: ", error);
  } finally {
    sequelize.close();
  }
};

init();
