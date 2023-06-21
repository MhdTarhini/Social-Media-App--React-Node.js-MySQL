const express = require("express");
const router = express.Router();
const { likePost, alreadyLiked } = require("../controller/likes");
const verifyToken = require("../middleware/verifyToken");

router.post("/addlike", verifyToken, likePost);
router.post("/", verifyToken, alreadyLiked);

module.exports = router;
