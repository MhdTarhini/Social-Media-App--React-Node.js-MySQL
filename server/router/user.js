const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const getUsers = require("../controller/user");
const router = express.Router();

router.get("/", verifyToken, getUsers);

module.exports = router;
