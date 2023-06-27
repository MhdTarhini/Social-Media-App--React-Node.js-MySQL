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
  console.log(req.body);
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

module.exports = { getUsers, updateUser };
