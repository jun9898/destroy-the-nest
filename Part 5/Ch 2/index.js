const cookieSession = require('cookie-session');
const express = require('express');
const path = require('path');
const { default: mongoose } = require('mongoose');
const User = require('./src/models/users.model');
const passport = require('passport');
const config = require('config')
const serverConfig = config.get('server')
const cookieConfig = config.get('cookie')
const app = express();
const {maxAge} = require("express-session/session/cookie");
const {checkAuthenticated, checkNotAuthenticated} = require("./src/middlewares/auth");
require('dotenv').config();
require('./src/config/passport');

const mainRouter = require("./src/routes/main.router");
const userRouter = require("./src/routes/user.router");

app.set("views", path.join(__dirname, "src/views"));
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

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', mainRouter);
app.use('/auth', userRouter);






mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const port = serverConfig.port;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});