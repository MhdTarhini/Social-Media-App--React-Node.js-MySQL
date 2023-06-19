const PostsModel = require("../models/posts");

const getPosts = async (req, res) => {
  try {
    const allPosts = await PostsModel.findAll();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = getPosts;
