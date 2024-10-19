const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");
class Blog extends Model {}

const yearMin = 1991;

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
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: {
          args: new Date().getFullYear(),
          msg: "Year must be less than or equal to the current year",
        },
        min: {
          args: yearMin,
          msg: `Year must be greater than or equal to ${yearMin}`,
        },
      },
    },
  },
  {
    underscored: true,
    modelName: "blog",
    sequelize,
  }
);

module.exports = Blog;
