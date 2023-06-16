const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const userModels = require("./users");
const PostsModel = require("./posts");

const CommentModel = sequelize.define(
  "comment",
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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

userModels.hasMany(CommentModel, {
  foreignKey: "UserId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
CommentModel.belongsTo(userModels, { foreignKey: "UserId" });

PostsModel.hasMany(CommentModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
CommentModel.belongsTo(PostsModel, { foreignKey: "postId" });

// (async () => {
//   try {
//     await sequelize.sync({ alter: true });
//   } catch (error) {
//     console.log(error);
//   }
//   // Code here
// })();

module.exports = CommentModel;
