const express = require('express');
const path = require("path");
const usersController = require('./controllers/users.controller');
const postsController = require('./controllers/posts.controller');

const PORT = 3000;

const app = express();

const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use((req, res, next) => {
    const start = Date.now();
    console.log(`start : ${req.method} ${req.url}`);
    next();
    const diffTime = Date.now() - start;
    console.log(`end : ${req.method} ${req.baseUrl} ${req.url} ${diffTime}ms`);
});

app.get('/', (req, res) => {
    res.render('index', {
        imageTitle: 'it is a penguin',
    });
});

app.get('/', (req, res) => {
    res.render('posts', {
        templateName: 'post',
    });
});

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
