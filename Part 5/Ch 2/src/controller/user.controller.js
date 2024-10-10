const passport = require("passport");
const User = require("../models/users.model");
const sendMail = require("../mail/mail");

const localLogin = (req, res, next) => {
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
}

const logout = (req, res, next) => {
    req.logOut(function (err) {
        if (err) { return next(err); }
    });
    res.redirect('/');
}

const localSignup = (req, res) => {
    const user = new User(req.body);
    console.log(user);
    user.save()
        .then(() => {
            sendMail("nice1998@gmail.com", "byeong jun", "welcome");
            res.redirect('/login')
        })
        .catch(err => console.log(err));
}


module.exports = {
    localLogin,
    localSignup,
    logout,
}