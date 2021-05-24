"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://stackoverflow.com/questions/66186023/socket-io-typescript-fails-to-create-a-server-this-expression-is-not-callable
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default({ origin: 'http://localhost.3000' }));
app.get('/', (req, res) => {
    res.send('test');
});
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const getApiAndEmit = (socket) => {
    const response = new Date();
    // Emitting the response, will be consumed by client
    socket.emit('FromApi', response);
};
let interval;
io.on('connection', (socket) => {
    console.log('new client connected');
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on('disconnect', () => {
        console.log('client disconnected');
        clearInterval(interval);
    });
});
const port = 3001;
app.listen(port, () => {
    console.log(`server is running at ${port}`);
});
//# sourceMappingURL=index.js.map