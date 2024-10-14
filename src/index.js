require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    underscored: true,
    timestamps: false,
    modelName: "blog",
    sequelize,
  }
);

Blog.sync();

app.use(express.json());

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.delete("/api/blogs/:id", async (req, res) => {
  const id = req.params.id;
  await Blog.destroy({ where: { id } });

  res.status(204).end();
});

app.post("/api/blogs", async (req, res) => {
  const blog = await Blog.create(req.body);

  res.status(201).json(blog);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is running. http://localhost:${PORT}`));
