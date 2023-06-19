const PostsModel = require("../models/posts");
const userModels = require("../models/users");
const fs = require("fs");

const getPosts = async (req, res) => {
  try {
    const allPosts = await PostsModel.findAll({ include: [userModels] });
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json(error);
  }
};

// const addPost = async (req, res) => {
//   //   let newPath = "";
//   //   if (req.file) {
//   //     const { originalname, path } = req.file;
//   //     const parts = originalname.split(".");
//   //     const ext = parts[parts.length - 1];
//   //     newPath = path + "." + ext;
//   //     fs.renameSync(path, newPath);
//   //   }
//   console.log(req.body);
//   console.log(req.file);
// };

module.exports = { getPosts };
