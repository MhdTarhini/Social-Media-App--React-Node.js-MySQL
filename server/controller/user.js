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
  const {
    id,
    profileImage,
    coverImage,
    name,
    email,
    location,
    website,
    facebook,
    instagram,
    linkedin,
    twitter,
  } = req.body;
  try {
    await userModels.update(
      {
        profileImage: profileImage,
        coverImage: coverImage,
        name: name,
        email: email,
        location: location,
        website: website,
        facebook: facebook,
        instagram: instagram,
        linkedin: linkedin,
        twitter: twitter,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json("user is updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getUsers, updateUser, getUser };
