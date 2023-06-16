const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const userModels = require("./users");

const PostsModel = sequelize.define("posts", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postImage: {
    type: DataTypes.STRING,
  },
  postVideo: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: userModels,
      key: "id",
    },
  },
});

userModels.hasMany(PostsModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
PostsModel.belongsTo(userModels, { foreignKey: "userId" });

// (async () => {
//   await sequelize.sync({ force: true });
//   // Code here
// })();

module.exports = PostsModel;
