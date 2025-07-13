var socket = io();

function sendMessage() {
  var msg = document.getElementById('messageInput').value;
  var user = document.getElementById('username').value;
  if(msg) {
    socket.emit('chat message', { user: user, msg: msg });
    document.getElementById('messageInput').value = '';
  }
}

socket.on('chat message', function(data){
  var item = document.createElement('li');
  item.textContent = data.user + ': ' + data.msg;
  document.getElementById('messages').appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

document.getElementById('messageInput').addEventListener('keydown', function(e){
  if(e.key === 'Enter') sendMessage();
});
