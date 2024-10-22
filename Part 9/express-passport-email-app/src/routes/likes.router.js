const express = require('express');
const {checkAuthenticated} = require("../middlewares/auth");
const Post = require('../models/posts.model');
const router = express.Router({ mergeParams: true });

router.put('/', checkAuthenticated, (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post.likes.find(like => like === req.user._id.toString())) {
                post.likes = post.likes.filter(like => like !== req.user._id.toString());
            } else {
                post.likes.push(req.user._id.toString());
            }
            post.save();
        })
        .then(() => {
            res.redirect(req.get('Referrer') || '/')
        })
        .catch(err => {
            req.flash('error', err.message);
            res.redirect(req.get('Referrer') || '/')
        })
})

module.exports = router;
