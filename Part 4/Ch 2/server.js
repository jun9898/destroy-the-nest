const express = require('express');
const usersController = require('./controllers/users.controller');
const postsController = require('./controllers/posts.controller');

const PORT = 3000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    const start = Date.now();
    console.log(`start : ${req.method} ${req.url}`);
    next();
    const diffTime = Date.now() - start;
    console.log(`end : ${req.method} ${req.url} ${diffTime}ms`);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// User
app.get('/users', usersController.getUsers);
app.get('/users/:userId', usersController.getUser);
app.post('/users', usersController.postUser);

// Post
app.get("/posts", postsController.getPost);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
