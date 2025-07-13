var socket = io();

function sendMessage() {
  var msg = document.getElementById('messageInput').value;
  var user = document.getElementById('username').value;
  if(msg) {
    socket.emit('chat message', { user: user, msg: msg });
    document.getElementById('messageInput').value = '';
  }
}

// Show single new message
socket.on('chat message', function(data){
  addMessageToUI(data);
});

// Show history on first load
socket.on('history', function(history){
  document.getElementById('messages').innerHTML = ''; // clear existing
  history.forEach(addMessageToUI);
});

// Add message item with timestamp
function addMessageToUI(data) {
  var item = document.createElement('li');
  item.textContent = `[${data.timestamp}] ${data.user}: ${data.msg}`;
  document.getElementById('messages').appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}

// Send on Enter
document.getElementById('messageInput').addEventListener('keydown', function(e){
  if(e.key === 'Enter') sendMessage();
});
