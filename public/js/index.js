let socket = io();

socket.on("connect", function() {
  console.log("Connected to server");

//   socket.emit("createMessage", {
//     from: "Brandon",
//     text: "Yup, that works"
//   });
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
})

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});


  // socket.emit('createEmail', {
  //     to: 'jen@example.com',
  //     text: 'Hey. This is Brando'
  //   });
  // });


// socket.on("newEmail", function(email) {
//   console.log("New Email", email);
// });
