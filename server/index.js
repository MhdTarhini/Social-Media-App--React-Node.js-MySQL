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
// const server = require("http").createServer(app);
// const WebSocket = require("./websocket");

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

app.listen(4000, async () => {
  console.log("Server started on port 4000");
  await ConnectToDb();
});


// function startWebSocket(server) {
//   const wss = new WebSocket.Server({ server: server });
//   wss.on("connection", function connection(ws) {
//     console.log("a new client is connected");
//     ws.send("welcome new client");
//     ws.on("message", function incoming(message) {
//       console.log("received message", message);
//       ws.send("your message is ", message);
//     });
//   });
// }