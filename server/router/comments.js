const express = require("express");
const router = express.Router();
const { addComment, getComments } = require("../controller/comments");
const verifyToken = require("../middleware/verifyToken");

router.post("/addComment", verifyToken, addComment);
router.post("/getComments", verifyToken, getComments);

module.exports = router;
