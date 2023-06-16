const express = require("express");
const userModels = require("./models/user");
const app = express();

app.use(express.json());

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
