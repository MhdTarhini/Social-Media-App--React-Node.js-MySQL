const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const userModels = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
  profileImage: {
    type: DataTypes.STRING,
  },
  coverImage: {
    type: DataTypes.STRING,
  },
  website: {
    type: DataTypes.STRING,
  },
});

module.exports = userModels;
