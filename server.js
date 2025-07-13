const fs = require('fs');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('.'));

let messages = [];

// Load existing messages on startup
if (fs.existsSync('messages.json')) {
  messages = JSON.parse(fs.readFileSync('messages.json'));
}

io.on('connection', (socket) => {
  console.log('User connected');

  // Send chat history to new user
  socket.emit('chat history', messages);

  // On new chat message
  socket.on('chat message', (data) => {
    messages.push(data);
    fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2)); // pretty print
    io.emit('chat message', data); // broadcast
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
