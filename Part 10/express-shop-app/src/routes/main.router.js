const express = require('express');
const {checkNotAuthenticated, checkAuthenticated} = require("../middlewares/auth");
const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
    res.redirect('/products');
});

mainRouter.get('/login', checkNotAuthenticated, (req, res) => {
    console.log('login')
    res.render('auth/login');
});

mainRouter.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('auth/signup');
});

module.exports = mainRouter;

