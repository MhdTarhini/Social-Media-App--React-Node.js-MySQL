const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const userModels = require("./users");

const ActivityModel = sequelize.define(
  "activity",
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
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

userModels.hasMany(ActivityModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
ActivityModel.belongsTo(userModels, { foreignKey: "userId" });

// (async () => {
//   try {
//     await sequelize.sync({ alter: true });
//   } catch (error) {
//     console.log(error);
//   }
//   // Code here
// })();

module.exports = ActivityModel;
