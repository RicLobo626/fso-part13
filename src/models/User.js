const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Username must be a valid email",
        },
      },
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    underscored: true,
    modelName: "user",
    defaultScope: {
      attributes: { exclude: ["passwordHash"] },
    },
    scopes: {
      sensitive: {
        attributes: { include: ["passwordHash"] },
      },
    },
    sequelize,
  }
);

module.exports = User;
