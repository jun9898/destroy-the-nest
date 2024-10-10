const express = require('express');
const passport = require("passport");
const User = require("../models/users.model");
const {localLogin, logout, localSignup} = require("../controller/user.controller");
const userRouter = express.Router();

// local auth
userRouter.post('/login', localLogin);
userRouter.post('/signup', localSignup);

// google auth
userRouter.get('/google', passport.authenticate('google'));
userRouter.get('/google/callback', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));

// Kakao auth
userRouter.get('/kakao', passport.authenticate('kakao'));
userRouter.get('/kakao/callback', passport.authenticate('kakao', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));

userRouter.post('/logout', logout);

module.exports = userRouter;