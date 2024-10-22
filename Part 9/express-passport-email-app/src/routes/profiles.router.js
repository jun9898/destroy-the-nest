const express = require('express');
const Post = require('../models/posts.model');
const User = require('../models/users.model');
const {checkAuthenticated, checkIsMe} = require("../middlewares/auth");
const router = express.Router({ mergeParams: true });

router.get('/', checkAuthenticated, async (req, res) => {
    try {
        const posts = await Post.find({"author.id": req.params.id})
            .populate('comments')
            .sort({createdAt: 'desc'})
        const user = await User.findById(req.params.id);

        if (!user || !posts) {
            throw new Error('User or posts not found');
        }

        console.log(user)

        res.render('profile', {
            posts: posts,
            user: user
        });

    } catch (err) {
        console.log(err.message)
        req.flash('error', 'Failed to load profile');
        res.redirect('back');
    }

});

router.get('/edit', checkIsMe, async (req, res) => {
    res.render('profile/edit', {
        user: req.user
    });
});

router.put('/', checkIsMe, (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(user => {
            req.flash('success', 'Profile updated successfully');
            res.redirect(`/profile/${user._id}`);
        })
        .catch(err => {
            req.flash('error', 'Failed to update profile');
            res.redirect('back');
        });
});

module.exports = router;
