var socket = io();

// Load chat history
socket.on('chat history', function(history){
  history.forEach(addMessage);
});

function sendMessage() {
  var msg = document.getElementById('messageInput').value;
  var user = document.getElementById('username').value;
  if(msg) {
    socket.emit('chat message', { user: user, msg: msg });
    document.getElementById('messageInput').value = '';
  }
}

socket.on('chat message', function(data){
  addMessage(data);
});

function addMessage(data) {
  var msgDiv = document.createElement('div');
  msgDiv.classList.add('chat-message');
  msgDiv.classList.add('from-' + data.user.toLowerCase());
  msgDiv.textContent = data.user + ': ' + data.msg;
  document.getElementById('messages').appendChild(msgDiv);
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

document.getElementById('messageInput').addEventListener('keydown', function(e){
  if(e.key === 'Enter') sendMessage();
});
