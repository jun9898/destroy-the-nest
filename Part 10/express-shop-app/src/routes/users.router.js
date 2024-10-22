const express = require('express');
const passport = require("passport");
const User = require("../models/users.model");
const {localLogin, logout, localSignup} = require("../controller/user.controller");
const usersRouter = express.Router();

// local auth
usersRouter.post('/login', localLogin);
usersRouter.post('/signup', localSignup);

// google auth
usersRouter.get('/google', passport.authenticate('google'));
usersRouter.get('/google/callback', passport.authenticate('google', {
    successReturnToOrRedirect: '/products',
    failureRedirect: '/login'
}));

// Kakao auth
usersRouter.get('/kakao', passport.authenticate('kakao'));
usersRouter.get('/kakao/callback', passport.authenticate('kakao', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));

usersRouter.post('/logout', logout);

module.exports = usersRouter;