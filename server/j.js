// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
// const WebSocket = require("./websocket");
// const endpoint = require("./endpoint");

// app.use(endpoint);

// server.listen(3000, () => {
//   console.log("Server listening on port 3000");
// });

// const WebSocket = require("ws");
// const wss = new WebSocket.Server({ port: 4000 });

// wss.on("connection", function connection(ws) {
//   console.log("WebSocket connection established!");
//   ws.send("Hello Client!");

//   ws.on("message", function incoming(message) {
//     console.log("received message:", message);
//   });
// });

// module.exports = wss;

// const express = require("express");
// const router = express.Router();
// const wss = require("./websocket");

// router.get("/my-endpoint", (req, res) => {
//   const ws = new WebSocket("ws://localhost:4000");
//   ws.on("open", function open() {
//     console.log("ActivityTraker WebSocket connection established");
//   });
//   ws.on("message", function incoming(data) {
//     console.log("ActivityTraker received message:", data);
//     res.send(`ActivityTraker Response from server: ${data}`);
//   });
// });
// module.exports = router;

// // Upgrade request to WebSocket connection
// //   req.upgradeReq = ws;
// //   wss.handleUpgrade(req, ws, [], function done(socket) {
// //     wss.emit("connection", socket, req);
// //   });

// //   ws.on("message", function incoming(message) {
// //     console.log("received message:", message);
// //     res.send(`Response from server: ${message}`);
// //   });
// // });

// const express = require("express");
// // const router = express.Router();
// // const wss = require("./websocket");

// router.get("/my-endpoint", (req, res) => {
//   const ws = new WebSocket("ws://localhost:4000");
//   ws.on("open", function open() {
//     console.log("ActivityTraker WebSocket connection established");
//   });
//   ws.on("message", function incoming(data) {
//     console.log("ActivityTraker received message:", data);
//     res.send(`ActivityTraker Response from server: ${data}`);
//   });
// });

// module.exports = router;
