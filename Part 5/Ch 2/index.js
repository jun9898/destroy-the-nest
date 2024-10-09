const cookieSession = require('cookie-session');
const express = require('express');
const path = require('path');
const { default: mongoose } = require('mongoose');
const User = require('./models/users.model');
const passport = require('passport');
require('dotenv').config();
const app = express();

app.use(
    cookieSession({
        name: 'cookie-session-name',
        maxAge: 1209600000,
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

require('./config/passport');
const {maxAge} = require("express-session/session/cookie");
const {checkAuthenticated, checkNotAuthenticated} = require("./middlewares/auth");

app.use('/static', express.static(path.join(__dirname, 'public')));

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login');
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            console.log('No user found');
            return res.json({ msg: info});
        }

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    })(req, res, next);
});

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/callback', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    console.log(user);
    await user.save()
        .then(() => {
            res.status(200).json({
                success : true
            })
        })
        .catch(err => console.log(err));
});

app.post('/logout', (req, res, next) => {
    req.logOut(function (err) {
        if (err) { return next(err); }
    });
    res.redirect('/');
});

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index');
})


const port = 4000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});