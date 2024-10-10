const express = require('express');
const {checkNotAuthenticated, checkAuthenticated} = require("../middlewares/auth");
const mainRouter = express.Router();

mainRouter.get('/', checkAuthenticated, (req, res, next) => {
    res.render('index');
});

mainRouter.get('/login', checkNotAuthenticated, (req, res, next) => {
    res.render('login');
});

mainRouter.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('signup');
});

module.exports = mainRouter;

