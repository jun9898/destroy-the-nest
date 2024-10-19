const cookieSession = require('cookie-session');
const express = require('express');
const path = require('path');
const { default: mongoose } = require('mongoose');
const passport = require('passport');
const config = require('config')
const serverConfig = config.get('server')
const cookieConfig = config.get('cookie')
const app = express();
const mainRouter = require('./routes/main.router');
const friendsRouter = require('./routes/friends.router');
const likesRouter = require('./routes/likes.router');
const commentsRouter = require('./routes/comments.router');
const postsRouter = require('./routes/posts.router');
const usersRouter = require('./routes/users.router');
const profileRouter = require('./routes/profiles.router');

require('dotenv').config();
require('./config/passport');

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(
    cookieSession({
        name: 'cookie-session-name',
        maxAge: cookieConfig.expiresIn,
        keys: [process.env.COOKIE_KEY]
    })
);

app.use(function(request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', mainRouter);
app.use('/auth', usersRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/comments', commentsRouter);
app.use('/profile/:id', profileRouter);
app.use('/friends', friendsRouter);
app.use(likesRouter);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const port = serverConfig.port;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});