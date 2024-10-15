const express = require('express');
const app = express();

const path = require("node:path");
const http = require('http');
const server = http.createServer(app);
const Server = require('socket.io');
const {addUser, getUsersInRoom, getUser, removeUser} = require("./utils/users");
const {generateMessage} = require("./utils/messages");
const io = new Server(server);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    socket.on('join', ({username, room}, callback) => {
        const { error, user } = addUser({id: socket.id, username, room});
        if (error) {
            return callback(error);
        }
        // socket.join(room)은 room에 해당하는 방에 소켓을 조인시킨다.
        // dictionary 형태로 생각하면 편할듯
        socket.join(user.room);

        socket.emit('message', generateMessage('Admin', `Welcome to ${user.room}!`));
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`));

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    });

    socket.on('disconnect', () => {
        console.log('User has left', socket.id);

        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`));
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
