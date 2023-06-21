const LikesModel = require("../models/likes");

const likePost = async (req, res) => {
  const { postId, UserId, createdAt, likeStatus } = req.body;
  if (likeStatus) {
    try {
      const likedPost = await LikesModel.create({ postId, UserId, createdAt });
      return res.status(200).json(likedPost);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    try {
      const UnlikedPost = await LikesModel.destroy({
        where: { postId, UserId },
      });
      return res.status(200).json(UnlikedPost);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

const alreadyLiked = async (req, res) => {
  const { postId, UserId } = req.body;

  try {
    const alreadyLikedPost = await LikesModel.findAll({
      where: { postId, UserId },
    });
    if (alreadyLikedPost.length === 0) return res.status(200).json(false);
    return res.status(200).json(true);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { likePost, alreadyLiked };
