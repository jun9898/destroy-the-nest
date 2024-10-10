const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = 3000;

const app = express();

const usersRouter = require('./routes/users.router');
const postsRouter = require('./routes/posts.router');
const productsRouter = require('./routes/products.router');

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
app.use('/products', productsRouter);

app.use((err, req, res, next) => {
    res.json({ message: err.message });
})

app.get("*", function (req, res, next) {
    setImmediate(() => {
        next(new Error("Page Not Found"));
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
