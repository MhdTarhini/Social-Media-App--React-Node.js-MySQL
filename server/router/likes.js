const express = require("express");
const router = express.Router();
const { likePost, alreadyLiked, countLikes } = require("../controller/likes");
const activityTracker = require("../middleware/activityTracker");

router.post("/addlike", activityTracker, likePost);
router.post("/", alreadyLiked);
router.get("/count", countLikes);

module.exports = router;

