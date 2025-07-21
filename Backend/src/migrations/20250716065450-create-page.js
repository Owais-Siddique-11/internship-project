"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM("published", "draft"),
        allowNull: false,
        defaultValue: "draft",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pages");
  },
};
