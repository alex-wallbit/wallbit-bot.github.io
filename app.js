const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('dotenv').config()

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html', { envVariable: process.env.BACKEND_URL });
});

  io.on('connection', (socket) => {
    //console.log('A user connected');

  socket.on('disconnect', () => {
    //console.log('User disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log(`Server is running on ${process.env.FRONTEND_URL}`);
});