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
    app.handleSubmit();
  });
  $('#update').click(function(event){
    event.preventDefault();
    app.fetch();
  });
};

app.clearMessages = function(){
  $('#chats').children().remove();
};
app.addMessage = function(message){
  var $newStuff = $('<div class="chat"><div class = "username">'+message.username+'</div>'
    +'<div class="userMessage">'+message.text+'</div></div>');
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
      // console.log(data);
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
      console.log('chatterbox: Message received');
      console.log(data);
      // for(var i=0; i<data.results.length; i++) {
      //   if(data.results[i].username === window.location.search.slice(10)) {
      //     console.log(data.results[i]);
      //   }
      // }
      updateDisplay(data);
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
  // get name from url
  var realName = window.location.search.slice(10);
  realName = unescape(realName);

  var message = {
    username : realName,
    text : $('#message').val(),
    roomname : $('#roomSelect').val()
  };
  app.send(message);
  app.fetch();
};


$(document).ready(function(){
  app.init();
});

function updateDisplay(data) {
  // clear current display
  app.clearMessages();
  // get current list of chat rooms
  var roomLists = [];
  for(var j = 0; j < $('#roomSelect').children().length; j++) {
    roomLists.push($($('#roomSelect').children()[j]).text());
  }

  var currentRoom = $('#roomSelect').val();
  // console.log(roomLists);
  // iterate through the data array
  for (var i=0; i<data.results.length; i++) {
    var temp = data.results[i].roomname;
    // add chat room if we don't have one
    if(roomLists.indexOf(temp) === -1 && temp!==undefined) {
      // add this data roomname to our roomlist
      roomLists.push(temp);
      app.addRoom(temp);
    }

    // for each data point, add message to our display
    if(currentRoom === 'Lobby') {
      app.addMessage(data.results[i]);
    }
    else if(currentRoom === temp){
      app.addMessage(data.results[i]);
    }
  }
  // app.init();
  $('.chat').click(function(event){
    event.preventDefault();
    app.addFriend(this);
  });
}













