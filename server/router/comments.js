const express = require("express");
const router = express.Router();
const {
  addComment,
  getComments,
  countComments,
} = require("../controller/comments");
const activityTracker = require("../middleware/activityTracker");

router.post("/addComment", activityTracker, addComment);
router.post("/", getComments);
router.get("/count", countComments);

module.exports = router;
