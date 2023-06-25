const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const { getUsers, updateUser } = require("../controller/user");
const router = express.Router();

router.get("/", verifyToken, getUsers);
router.post("/updateUser", verifyToken, updateUser);

module.exports = router;
