const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("social-media-app", "root", "mohamed123", {
  host: "localhost",
  dialect: "mysql",
});

const ConnectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("db is connected");
  } catch (err) {
    console.log("ERROR db is not connected", err);
  }
};

module.exports = { sequelize, ConnectToDb };
