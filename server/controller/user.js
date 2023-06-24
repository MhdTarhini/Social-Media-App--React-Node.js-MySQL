const userModels = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const data = await userModels.findAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = getUsers;
