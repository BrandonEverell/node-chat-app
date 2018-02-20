const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");



const { generateMessage, generateLocationMessage } = require("./utils/message");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 5000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat App!")
  );

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New User Joined!")
  );

  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback("This is from the server.");
  });

  socket.on("createLocationMessage", coords => {
    io.emit("newLocationMessage",
      generateLocationMessage("Admin", coords.latitude, coords.longitude));
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

server.listen(5000, () => {
  console.log(`Server is running on port ${port} `);
});
