const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("social-media", "root", "mohamed123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
