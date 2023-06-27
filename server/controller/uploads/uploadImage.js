const multer = require("multer");
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads/Images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), function (req, res) {
  console.log(req.file);
  const file = req.file;
  res.status(200).json(file);
});

module.exports = router;
