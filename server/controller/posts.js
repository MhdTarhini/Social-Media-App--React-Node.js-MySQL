const CommentModel = require("../models/comment");
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
const addComment = async (req, res) => {
  const { content, postId, userId, createdAt } = req.body;
  try {
    await CommentModel.create({
      content,
      postId,
      userId,
      createdAt,
    });
    res.status(200).json("comment is created");
  } catch (error) {
    console.log(error);
  }
};
const getComments = async (req, res) => {
  const { postId } = req.body;
  try {
    const allComments = await CommentModel.findAll({
      where: { postId },
      include: [
        {
          model: userModels,
        },
      ],
    });
    res.status(200).json(allComments.reverse());
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPosts, addPost, addComment, getComments };
