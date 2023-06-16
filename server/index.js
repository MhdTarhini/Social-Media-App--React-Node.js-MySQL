const express = require("express");
const { ConnectToDb } = require("./db");
const app = express();

app.use(express.json());

app.listen(4000, async () => {
  console.log("Server started on port 4000");
  await ConnectToDb();
});
