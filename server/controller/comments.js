const CommentModel = require("../models/comment");
const userModels = require("../models/users");

const addComment = async (req, res) => {
  const { content, postId, userId, createdAt } = req.body;
  try {
    await CommentModel.create({
      content,
      postId,
      userId,
      createdAt,
    });
    return res.status(200).json("comment is created");
  } catch (error) {
    return res.status(500).json(error);
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
    return res.status(200).json(allComments.reverse());
  } catch (error) {
    return res.status(500).json(error);
  }
};
const countComments = async (req, res) => {
  try {
    const { postId } = req.query;

    // Perform the database query to count rows with the specified postId
    const count = await CommentModel.count({ where: { postId } });

    return res.json({ count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addComment, getComments, countComments };
