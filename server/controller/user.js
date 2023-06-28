const userModels = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const data = await userModels.findAll();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModels.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed as a route parameter

    // Find the specific user you want to update based on the user ID
    const userToUpdate = await userModels.findByPk(userId);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the existing user with the values from req.body
    const updatedUser = await userToUpdate.update(req.body);

    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
  //     res.status(500).json(error);
  //   }
};

module.exports = { getUsers, updateUser, getUser };
