const express = require("express");
const { ConnectToDb } = require("./db");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth");
const cookieParser = require("cookie-parser");
const postsRoute = require("./router/postsRoute");
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.listen(4000, async () => {
  console.log("Server started on port 4000");
  await ConnectToDb();
});
