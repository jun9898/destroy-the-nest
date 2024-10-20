const express = require('express');
const {checkAuthenticated} = require("../middlewares/auth");
const router = express.Router();
const Post = require('../models/posts.model');

router.get('/', checkAuthenticated, (req, res) => {
    // populate는 join과 비슷한 역할을 한다.
    Post.find()
        .populate('comments')
        .sort({ createdAt: 'desc' })
        .exec()
        .then(posts => {
            res.render('posts', {
                posts: posts,
                currentUser: req.user
            });
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;
