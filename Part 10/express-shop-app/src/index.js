const cookieSession = require('cookie-session');
const express = require('express');
const path = require('path');
const { default: mongoose } = require('mongoose');
const passport = require('passport');
const config = require('config')
const serverConfig = config.get('server')
const app = express();
const cookieConfig = config.get('cookie')
const flash = require('connect-flash');
require('dotenv').config();
require('./config/passport');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const session = require('express-session');

const mainRouter = require("./routes/main.router");
const usersRouter = require("./routes/users.router");
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router");
const adminCategoriesRouter = require("./routes/admin-categories.router");
const adminProductsRouter = require("./routes/admin-products.router");

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// app.use(
//     cookieSession({
//         name: 'cookie-session-name',
//         maxAge: cookieConfig.expiresIn,
//         keys: [process.env.COOKIE_KEY]
//     })
// );

app.use(session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: cookieConfig.expiresIn,
        httpOnly: true,
        secure: false
    },
    name: 'shop-app-cookie'
}));

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
app.use(flash());
app.use(methodOverride("_method"));
app.use(fileUpload());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.cart = req.session.cart;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.currentUser = req.user;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/auth', usersRouter);
app.use('/admin/categories', adminCategoriesRouter);
app.use('/admin/products', adminProductsRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);

app.use((err, req, res, next) => {
    console.error(err.status);
    res.status(err.status || 500);
    res.send(err.message || 'Something broke!');
})

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const port = serverConfig.port;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});