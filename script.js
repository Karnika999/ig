var socket = io();

function sendMessage() {
  var msg = document.getElementById('messageInput').value;
  var user = document.getElementById('username').value;
  if(msg) {
    // send message to server with user info
    socket.emit('chat message', { user: user, msg: msg });
    document.getElementById('messageInput').value = '';
  }
}

// listen for incoming messages and add chat bubbles
socket.on('chat message', function(data){
  var msgDiv = document.createElement('div');
  msgDiv.classList.add('chat-message');
  msgDiv.classList.add('from-' + data.user.toLowerCase());
  msgDiv.textContent = data.user + ': ' + data.msg;

  document.getElementById('messages').appendChild(msgDiv);

  // scroll to bottom
  var chatArea = document.getElementById('messages');
  chatArea.scrollTop = chatArea.scrollHeight;
});

// send on Enter key
document.getElementById('messageInput').addEventListener('keydown', function(e){
  if(e.key === 'Enter') sendMessage();
});
