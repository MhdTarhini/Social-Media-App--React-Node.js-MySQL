const express = require("express");
const router = express.Router();
const { addComment, getComments } = require("../controller/comments");
const activityTracker = require("../middleware/activityTracker");

router.post("/addComment", activityTracker, addComment);
router.post("/", getComments);

module.exports = router;
