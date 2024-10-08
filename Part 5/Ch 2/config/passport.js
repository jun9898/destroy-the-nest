const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users.model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

const localStrategyConfig = new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({email: email.toLocaleLowerCase()});
            console.log("user = ", user)
            if (!user) {
                return done(null, false, { msg: `Email ${email} not found` });
            }

            user.comparePassword(password, (err, isMatch) => {
                console.log("isMatch = ", isMatch)
                if (err) return done(err);
                if (isMatch) {
                    return done(null, user);
                }
                return done(null, false, { msg: 'Invalid email or password.' })
            })
        } catch (err) {
            return done(err);
        }
    }
);
passport.use('local', localStrategyConfig);


