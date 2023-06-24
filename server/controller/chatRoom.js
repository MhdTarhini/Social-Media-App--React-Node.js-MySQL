const { Server } = require("socket.io");

function chatRoom(server) {
  const io = new Server(server, {
    cors: { origin: "http://localhost:3000" },
  });

  io.on("connection", (socket) => {
    console.log(`USER CONNECTED : ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User With ID : ${socket.id} Join Room ${data}`);
    });

    socket.on("send_message", (data) => {
      console.log(data);
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("user Disconnected", socket.id);
    });
  });
}

module.exports = chatRoom;
