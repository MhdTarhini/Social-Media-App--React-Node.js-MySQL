const express = require("express");
const router = express.Router();
const { likePost, alreadyLiked } = require("../controller/likes");
const activityTracker = require("../middleware/activityTracker");

router.post("/addlike", activityTracker, likePost);
router.post("/", alreadyLiked);

module.exports = router;
