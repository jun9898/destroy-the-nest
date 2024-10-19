const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
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

// local auth
const localStrategyConfig = new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({email: email.toLocaleLowerCase()});
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

// google auth
const googleStrategyConfig = new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: googleCallbackURL,
    scope: ['email', 'profile']
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id})
        .then(existingUser => {
            if (existingUser) {
                console.log("existingUser = ", existingUser)
                done(null, existingUser);
            } else {
                console.log("profile.emails[0].value = ", profile.emails[0].value)
                const user = new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName
                })
                console.log("user = ", user)
                user.save()
                    .then(user => done(null, user))
                    .catch(err => done(err));
            }
        })
        .catch(err => done(err));
});
passport.use('google', googleStrategyConfig);

// Kakao auth
const kakaoStrategyConfig = new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: '/auth/kakao/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log("profile = ", profile)
    User.findOne({kakaoId: profile.id})
        .then(existingUser => {
            if (existingUser) {
                console.log("existingUser = ", existingUser)
                done(null, existingUser);
            } else {
                const user = new User({kakaoId: profile._json.id, email: profile._json.kakao_account.email})
                user.save()
                    .then(user => done(null, user))
                    .catch(err => done(err));
            }
        })
        .catch(err => done(err));
});
passport.use('kakao', kakaoStrategyConfig);
