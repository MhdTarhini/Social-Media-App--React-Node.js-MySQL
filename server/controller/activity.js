const ActivityModel = require("../models/activityTracker");
const userModels = require("../models/users");

const getactivity = async (req, res) => {
  try {
    const allActivity = await ActivityModel.findAll({
      include: [
        {
          model: userModels,
        },
      ],
    });
    return res.status(200).json(allActivity);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = getactivity;
