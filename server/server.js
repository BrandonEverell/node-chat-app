const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 5000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'Hey. What is going on?',
  //   createdAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  //
  // })
  socket.emit('newMessage', {
    from: 'Brando',
    text: 'See you then',
    createdAt: 123123

  })

  socket.on('createMessage', (message) => {
    console.log('createMeassage', message)
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});



server.listen(5000, () => {
  console.log(`Server is running on port ${port} `);
})
