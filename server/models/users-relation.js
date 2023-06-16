const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const userModels = require("./users");

const UserRelationModel = sequelize.define(
  "user-relation",
  {
    follower_UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: userModels,
        key: "id",
      },
    },
    followed_UserId: {
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

userModels.hasMany(UserRelationModel, {
  foreignKey: "follower_UserId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
UserRelationModel.belongsTo(userModels, { foreignKey: "follower_UserId" });

userModels.hasMany(UserRelationModel, {
  foreignKey: "followed_UserId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
UserRelationModel.belongsTo(userModels, { foreignKey: "followed_UserId" });

// (async () => {
//   try {
//     await sequelize.sync({ alter: true });
//   } catch (error) {
//     console.log(error);
//   }
//   // Code here
// })();

module.exports = UserRelationModel;
