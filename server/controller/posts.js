const PostsModel = require("../models/posts");
const userModels = require("../models/users");

const getPosts = async (req, res) => {
  try {
    const allPosts = await PostsModel.findAll({ include: [userModels] });
    res.status(200).json(allPosts.reverse());
  } catch (error) {
    res.status(404).json(error);
  }
};

const addPost = async (req, res) => {
  console.log(req.body);
  const { content, postImage, postVideo, createdAt, userId } = req.body;
  try {
    await PostsModel.create({
      content,
      postImage,
      postVideo,
      createdAt,
      userId,
    });
    res.status(200).json("post is created");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPosts, addPost };
