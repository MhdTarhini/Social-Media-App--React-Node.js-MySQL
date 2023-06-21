const express = require("express");
const router = express.Router();
const { getPosts, addPost } = require("../controller/posts");
const activityTracker = require("../middleware/activityTracker");

router.get("/", getPosts);
router.post("/addPost", activityTracker, addPost);

module.exports = router;
