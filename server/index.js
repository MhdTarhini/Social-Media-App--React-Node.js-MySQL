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
const verifyToken = require("./middleware/verifyToken");
const activityRoute = require("./router/activity");
// const http = require("http");
// const ActivityModel = require("./models/activityTracker");
// const server = http.createServer(app);
// const io = require("socket.io")(server);

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(verifyToken);
// app.use(activityTraker);

app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/likes", likesRoute);
app.use("/api/uploadImage", uploadImage);
app.use("/api/uploadVideo", uploadVideo);
app.use("/api/activity", activityRoute);

// io.on("connection", (socket) => {
//   console.log("A user connected!");
//   // Here, you can emit any data you want, like this:
//   socket.emit("hello", "world");
// });
// // This is just an example, and you will need to modify it to fit your needs
// // const { Model } = require("sequelize");
// ActivityModel.afterUpdate((instance) => {
//   io.emit("model_updated", instance);
// });
// io.on("connection", (socket) => {
//   console.log("A user connected!");

//   socket.on("disconnect", () => {
//     console.log("A user disconnected!");
//   });
// });



app.listen(4000, async () => {
  console.log("Server started on port 4000");
  await ConnectToDb();
});
