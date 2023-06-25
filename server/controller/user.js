const userModels = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const data = await userModels.findAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const { UserId, ...userData } = req.body;
  try {
    const updatedata = await updatedata(UserId, userData);
    res.status(200).json("user is updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getUsers, updateUser };
