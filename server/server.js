const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");
const {isRealString} = require("./utils/validation")
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 5000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");



  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required');
    }
    socket.join(params.room);
    // socket.leave('The Office fans');

    // io.emit -> io.to('The Office fans').emit
    // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
    // socket.emit


    socket.emit(
      "newMessage",
      generateMessage("Admin", "Welcome to the chat App!")
    );

    socket.broadcast.to(params.room).emit(
      "newMessage",
      generateMessage("Admin", `${params.name} has joined.`)
    );
    callback()
  });



  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback();
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
