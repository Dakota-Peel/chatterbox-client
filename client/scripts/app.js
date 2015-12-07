// YOUR CODE HERE:

var message = {
  username: 'XXXXXXXXXXXX',
  text: 'trololo',
  roomname: '4chan'
};

var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox';
app.init = function(){};
app.clearMessages = function(){
  $('#chats').children().remove();
};
app.addMessage = function(message){
  var $newStuff = $('<div>'+message.text+'</div>');
  $('#chats').append($newStuff);
};
app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    // data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      console.log(data);
      // for(var i=0; i<data.results.length; i++) {
      //   if(data.results[i].username === message.username) {
      //     console.log(data.results[i]);
      //   }
      // }
      // console.log(data.results[0].username);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.addRoom = function(roomName) {
  $('#roomSelect').append('<option>'+roomName+'</option>');
}



$('#submitButton').on('click', post('place_holder_for_stuff'));

