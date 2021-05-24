// https://stackoverflow.com/questions/66186023/socket-io-typescript-fails-to-create-a-server-this-expression-is-not-callable
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());
app.get('/', (req, res) => {
  res.send('test');
});

const server = http.createServer(app);
// const io = new Server(server);
// https://socket.io/docs/v3/handling-cors/
const io = require('socket.io')(server, {
  cors: { origin: 'http://localhost:3000' },
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting the response, will be consumed by client
  socket.emit('FromAPI', response);
};

let interval: any;

io.on('connection', (socket) => {
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    return getApiAndEmit(socket), 1000;
  });

  socket.on('someEventName', (data) => {
    console.log('receive data from', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const port = 3001;
server.listen(port, () => {
  console.log(`server is running at ${port}`);
});
