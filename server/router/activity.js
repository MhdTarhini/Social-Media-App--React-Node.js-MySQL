const express = require("express");
const router = express.Router();
const getactivity = require("../controller/activity");

router.get("/", getactivity);

module.exports = router;
