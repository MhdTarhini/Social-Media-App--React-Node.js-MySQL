const PostsModel = require("../models/posts");
const userModels = require("../models/users");

const getPosts = async (req, res) => {
  try {
    const allPosts = await PostsModel.findAll({ include: [userModels] });
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = getPosts;
