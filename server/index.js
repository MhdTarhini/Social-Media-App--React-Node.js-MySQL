const express = require("express");
const { ConnectToDb } = require("./db");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth");
const cookieParser = require("cookie-parser");
const postsRoute = require("./router/postsRoute");
const commentsRoute = require("./router/comments");
const likesRoute = require("./router/likes");
const uploadImage = require("./controller/uploads/uploadImage");
const uploadVideo = require("./controller/uploads/uploadVideo");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/likes", likesRoute);
app.use("/api/uploadImage", uploadImage);
app.use("/api/uploadVideo", uploadVideo);

app.listen(4000, async () => {
  console.log("Server started on port 4000");
  await ConnectToDb();
});
