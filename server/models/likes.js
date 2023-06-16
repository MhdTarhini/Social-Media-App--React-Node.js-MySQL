const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const userModels = require("./users");
const PostsModel = require("./posts");

const LikesModel = sequelize.define(
  "likes",
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PostsModel,
        key: "id",
      },
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

userModels.hasMany(LikesModel, {
  foreignKey: "UserId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
LikesModel.belongsTo(userModels, { foreignKey: "UserId" });

PostsModel.hasMany(LikesModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
LikesModel.belongsTo(PostsModel, { foreignKey: "postId" });

// (async () => {
//   try {
//     await sequelize.sync({ alter: true });
//   } catch (error) {
//     console.log(error);
//   }
//   // Code here
// })();

module.exports = LikesModel;
