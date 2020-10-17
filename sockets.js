let sockets = {};

sockets.init = function (server) {
  const io = require("socket.io").listen(server);
  const { formatMessage } = require("./utils/messages");
  const { user } = require("./utils/users");
  const bot = "ChatCord Robo";

  // Socket events
  io.sockets.on("connection", function (socket) {
    console.log("New user connected", socket.id);

    socket.on("joinRoom", ({ username, room }) => {
      const _user = user.addUser(socket.id, username, room);

      socket.join(_user.room);

      // Only for single client
      socket.emit("message", formatMessage(bot, "Welcome to the ChatCord."));

      // Broadcast when a user connect #- Except Sender
      socket.broadcast
        .to(_user.room)
        .emit(
          "message",
          formatMessage(bot, `${_user.username} has joined the chat`)
        );

      // Send users and room info
      io.emit(_user.room).emit("roomUsers", {
        room: _user.room,
        users: user.getRoomUsers(_user.room),
      });
    });

    // For All Clients - io.emit()

    // Listen for chatMessage
    socket.on("chatMessage", (message) => {
      const _user = user.getCurrentUser(socket.id);

      io.to(_user.room).emit("message", formatMessage(_user.username, message));
    });

    // Runs when client disconnect
    socket.on("disconnect", () => {
      const _user = user.userLeave(socket.id);

      console.log("User left", _user);

      if (_user) {
        io.to(_user.room).emit(
          "message",
          formatMessage("message", `${_user.username} has left the chat`)
        );
      }
    });
  });
};

module.exports = sockets;
