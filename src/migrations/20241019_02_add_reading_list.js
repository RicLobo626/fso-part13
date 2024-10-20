const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("user_blogs", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "blogs",
          key: "id",
        },
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });

    await queryInterface.addConstraint("user_blogs", {
      type: "unique",
      fields: ["user_id", "blog_id"],
      name: "unique_user_blog",
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("user_blogs");
  },
};
