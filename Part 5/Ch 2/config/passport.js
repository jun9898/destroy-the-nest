const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/users.model');
require('dotenv').config();

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL;

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

const googleStrategyConfig = new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: googleCallbackURL,
    scope: ['email', 'profile']
}, (accessToken, refreshToken, profile, done) => {
    console.log("profile = ", profile)
    User.findOne({googleId: profile.id})
        .then(existingUser => {
            if (existingUser) {
                console.log("existingUser = ", existingUser)
                done(null, existingUser);
            } else {
                console.log("profile.emails[0].value = ", profile.emails[0].value)
                const user = new User({googleId: profile.id, email: profile.emails[0].value})
                console.log(user)
                user.save()
                    .then(user => done(null, user))
                    .catch(err => done(err));
            }
        })
        .catch(err => done(err));
});
passport.use('google', googleStrategyConfig);


