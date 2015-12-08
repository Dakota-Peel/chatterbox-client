// YOUR CODE HERE:

// var message = {
//   username: 'XXXXXXXXXXXX',
//   text: 'trololo',
//   roomname: '4chan'
// };

var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox';

app.init = function(){
  $('#form').submit(function(event){
    event.preventDefault();
    console.log('hah! got this!');
    app.handleSubmit();
  });
};

app.clearMessages = function(){
  $('#chats').children().remove();
};
app.addMessage = function(message){
  var $newStuff = $('<div class="chat"><div class = "username">'+message.username+'</div>'
    +'<div class="userMessage">'+message.text+'</div></div>');
  $('#chats').append($newStuff);

  $('.chat').click(function(){
    app.addFriend(this);
  });
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
      for(var i=0; i<data.results.length; i++) {
        if(data.results[i].username === window.location.search.slice(10)) {
          console.log(data.results[i]);
        }
      }
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

app.addFriend = function(input){
  console.log($($(input).children()[0]).text());
};


app.handleSubmit = function(){
  var message = {
    username : window.location.search.slice(10),
    text : $('#message').val(),
    roomname : $('#roomSelect').val()
  };
  app.send(message);
};

// $(document).ready(function(){  
//   $('#form').submit(function(event){
//     event.preventDefault();
//     console.log('hah! got this!');
//     app.handleSubmit();
//   });
// });


$(document).ready(function(){
  app.init();
});















