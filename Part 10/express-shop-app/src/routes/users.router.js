const express = require('express');
const passport = require("passport");
const {localLogin, logout, localSignup} = require("../controller/user.controller");
const usersRouter = express.Router();

// 로컬 인증
usersRouter.post('/login', localLogin);
usersRouter.post('/signup', localSignup);

// 소셜 인증 라우트 설정을 위한 함수
function setupSocialAuthRoute(provider, successRedirect, failureRedirect) {
    usersRouter.get(`/${provider}`, passport.authenticate(provider));
    usersRouter.get(`/${provider}/callback`, passport.authenticate(provider, {
        successReturnToOrRedirect: successRedirect,
        failureRedirect: failureRedirect
    }));
}

// 구글 인증
setupSocialAuthRoute('google', '/products', '/login');

// 카카오 인증
setupSocialAuthRoute('kakao', '/', '/login');

// 로그아웃
usersRouter.post('/logout', logout);

module.exports = usersRouter;