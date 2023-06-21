const express = require("express");
const router = express.Router();
const { getPosts, addPost } = require("../controller/posts");
const verifyToken = require("../middleware/verifyToken");

router.get("/", getPosts);
router.post("/addPost", verifyToken, addPost);

module.exports = router;
