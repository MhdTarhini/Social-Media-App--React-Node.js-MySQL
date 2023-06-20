const express = require("express");
const router = express.Router();
const {
  getPosts,
  addPost,
  addComment,
  getComments,
} = require("../controller/posts");
const verifyToken = require("../middleware/verifyToken");

router.get("/", getPosts);
router.post("/addPost", verifyToken, addPost);
router.post("/addComment", verifyToken, addComment);
router.post("/getComments", verifyToken, getComments);



module.exports = router;
