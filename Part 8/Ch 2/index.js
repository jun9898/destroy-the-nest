const express = require("express");
const app = express();
const publicDirectoryPath = require("path").join(__dirname, "./public");
const http = require("http");
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);
const mongoose = require('mongoose');
require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL
const sessionRouter = require('./src/routes/session.routes');
const {saveMessage, fetchMessages} = require("./src/utils/messages");
const PORT = 4000;

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.use(express.json());
app.use(express.static(publicDirectoryPath));

let users = [];

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    const userID = socket.handshake.auth.userID;
    if (!username) {
        return next(new Error("invalid username or userID"));
    }
    console.log("username = ", username);
    console.log("userID = ", userID);
    socket.username = username;
    socket.id = userID;
    next();
});

io.on("connection", async socket => {
    let userData = {
        username: socket.username,
        userID: socket.id
    };
    console.log("userData = ", userData);
    users.push(userData);

    io.emit("users-data", { users });

    socket.on('message-to-server', (payload) => {
        io.to(payload.to).emit('message-to-client', payload);
        saveMessage(payload);
    });

    socket.on('fetch-messages', ({ receiver }) => {
        // 메시지 가져오기 로직
        fetchMessages(io, socket.id, receiver);
    });

    socket.on('disconnect', () => {
        users = users.filter(user => user.userID !== socket.id);
        io.emit("users-data", { users });
        io.emit("user-away", socket.id);
    });
});

app.use("/session", sessionRouter);

// 변경: app.listen 대신 server.listen 사용
// 이렇게 해야 Express와 Socket.IO가 같은 서버에서 실행됨
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
