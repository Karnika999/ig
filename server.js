const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('.'));

let messageHistory = []; // 📝 store messages here

io.on('connection', (socket) => {
  console.log('a user connected');

  // Send existing history to the new user
  socket.emit('history', messageHistory);

  socket.on('chat message', (data) => {
    const timestamp = new Date().toLocaleTimeString(); // add timestamp
    const messageWithTime = { ...data, timestamp };
    messageHistory.push(messageWithTime); // save to history

    io.emit('chat message', messageWithTime); // send to everyone
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
