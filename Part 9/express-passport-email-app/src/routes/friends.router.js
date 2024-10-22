const express = require('express');
const User = require('../models/users.model');
const {checkAuthenticated} = require("../middlewares/auth");
const router = express.Router();

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.render('friends', {
                users: users,
                currentUser: req.user
            });
        })
        .catch(err => {
            req.flash('error', 'Failed to load friends');
            res.redirect('/posts');
        });
});

router.put('/:id/add-friend', checkAuthenticated, (req, res) => {
    // user는 상대방
    User.findById(req.params.id)
        .then(user => {
            console.log(user);
            user.friendsRequests.push(req.user._id);
            user.save();
            req.flash('success', 'Success to add friend');
            res.redirect('back');
        })
        .catch(() => {
            req.flash('error', 'Failed to add friend');
            res.redirect('back');
        });
})

router.put('/:firstId/remove-friend-request/:secondId', checkAuthenticated, (req, res) => {
    console.log(req.params)
    User.findById(req.params.firstId)
        .then(user => {
            user.friendsRequests = user.friendsRequests.filter(friend => friend.toString() !== req.params.secondId);
            user.save();
            req.flash('success', 'Success to remove friend');
            res.redirect('back');
        })
        .catch(() => {
            req.flash('error', 'Failed to remove friend request');
            res.redirect('back');
        })
});

router.put('/:id/accept-friend-request', checkAuthenticated, async (req, res) => {
    try {
        // 비동기 처리로 사용자 로드
        const otherUser = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        // friends 배열이 없는 경우 초기화
        if (!otherUser.friends) otherUser.friends = [];
        if (!currentUser.friends) currentUser.friends = [];

        // 친구 목록에 추가
        otherUser.friends.push(currentUser._id);
        currentUser.friends.push(otherUser._id);

        // 친구 요청 목록에서 제거
        currentUser.friendsRequests = currentUser.friendsRequests.filter(friend => friend.toString() !== req.params.id.toString());

        // 변경 사항 저장
        await otherUser.save();
        await currentUser.save();

        // 성공 메시지와 함께 리디렉션
        req.flash('success', 'Success to accept friend');
        res.redirect('back');
    } catch(err) {
        console.log(err.message);
        req.flash('error', 'Failed to accept friend');
        res.redirect('back');
    }
});

router.put('/:id/remove-friend', checkAuthenticated, async (req, res) => {
    try {
        // 사용자 찾기
        const otherUser = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!otherUser || !currentUser) {
            req.flash('error', 'User not found');
            return res.redirect('back');
        }

        // 친구 목록에서 서로 제거
        removeFriend(otherUser, req.user._id);
        removeFriend(currentUser, req.params.id);

        // 변경 사항 저장
        await otherUser.save();
        await currentUser.save();

        req.flash('success', 'Success to remove friend');
        res.redirect('back');
    } catch (err) {
        console.log(err.message);
        req.flash('error', 'Failed to remove friend');
        res.redirect('back');
    }
});

// 친구 목록에서 제거하는 함수
const removeFriend = (user, friendId) => {
    user.friends = user.friends.filter(friend => friend.toString() !== friendId.toString());
};

module.exports = router;
