const express = require("express");
const router = express.Router();
const { getPosts, addPost } = require("../controller/posts");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

router.get("/", getPosts);
router.post("/addPost", async (req, res) => {
  //   let newPath = "";
  //   if (req.file) {
  //     const { originalname, path } = req.file;
  //     const parts = originalname.split(".");
  //     const ext = parts[parts.length - 1];
  //     newPath = path + "." + ext;
  //     fs.renameSync(path, newPath);
  //   }
  console.log(req.body);
  console.log(req.file);
});

module.exports = router;
