const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const userModels = require("./users");

const StorysModel = sequelize.define(
  "storys",
  {
    storyImage: {
      type: DataTypes.STRING,
    },
    storyVideo: {
      type: DataTypes.STRING,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: userModels,
        key: "id",
      },
    },
  },
  {
    updatedAt: false,
    timestamps: true,
  }
);

userModels.hasMany(StorysModel, {
  foreignKey: "UserId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
StorysModel.belongsTo(userModels, { foreignKey: "UserId" });

// (async () => {
//   try {
//     await sequelize.sync({ alter: true });
//   } catch (error) {
//     console.log(error);
//   }
//   // Code here
// })();

module.exports = StorysModel;
