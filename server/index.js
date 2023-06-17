const express = require("express");
const { ConnectToDb } = require("./db");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth");

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/auth", authRoute);

app.listen(4000, async () => {
  console.log("Server started on port 4000");
  await ConnectToDb();
});
