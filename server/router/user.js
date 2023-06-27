const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { getUsers, updateUser, getUser } = require("../controller/user");
const activityTracker = require("../middleware/activityTracker");
const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/getuser/:userId", verifyToken, getUser);
router.post("/updateUser", verifyToken, activityTracker, updateUser);

module.exports = router;
