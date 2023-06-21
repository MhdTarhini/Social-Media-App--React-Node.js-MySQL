const PostsModel = require("../models/posts");
const userModels = require("../models/users");

const getPosts = async (req, res) => {
  try {
    const allPosts = await PostsModel.findAll({ include: [userModels] });
    return res.status(200).json(allPosts.reverse());
  } catch (error) {
    return res.status(404).json(error);
  }
};

const addPost = async (req, res) => {
  const { content, postImage, postVideo, createdAt, userId } = req.body;
  try {
    await PostsModel.create({
      content,
      postImage,
      postVideo,
      createdAt,
      userId,
    });
    return res.status(200).json("post is created");
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getPosts, addPost };
