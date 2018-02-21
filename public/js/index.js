let socket = io();

socket.on("connect", function() {
  console.log("Connected to server");

//   socket.emit("createMessage", {
//     from: "Brandon",
//     text: "Yup, that works"
//   });
});

socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

})

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  // let li = jQuery('<li></li>');
  // let a = jQuery('<a target="_blank">My Current Location </a>')
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  })

  jQuery('#messages').append(html);
})

socket.on("disconnect", function() {
  console.log("Disconnected from server");
});


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  let messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {
    messageTextbox.val('')
  })
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function ( ) {
    locationButton.removeAttr('disabled')
    alert('Unable to fetch location.')
  })
})
