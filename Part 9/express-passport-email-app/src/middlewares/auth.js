const Post = require('../models/posts.model');
const User = require('../models/users.model');
const Comment = require('../models/comments.model');


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/posts');
    }
    next();
}

function checkPostOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Post.findById(req.params.id)
            .then(post => {
                if (post.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'Permission denied');
                    res.redirect(req.get('Referrer') || '/')
                }
            })
            .catch(err => {
                req.flash('error', 'Post not found');
                res.redirect(req.get('Referrer') || '/')
            });
    } else {
        req.flash('error', 'Please Login first!');
        res.redirect(req.get('Referrer') || '/')
    }
}

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentId)
            .then(comment => {
                if (comment.author.id.equals(req.user._id)) {
                    req.comment = comment;
                    next();
                } else {
                    req.flash('error', 'Permission denied');
                    res.redirect(req.get('Referrer') || '/')
                }
            })
            .catch(err => {
                req.flash('error', 'Comment not found');
                res.redirect(req.get('Referrer') || '/')
            });
    } else {
        req.flash('error', 'Please Login first!');
        res.redirect(req.get('Referrer') || '/')
    }
}

function checkIsMe(req, res, next) {
    if (req.isAuthenticated()) {
        User.findById(req.params.id)
            .then(user => {
                if (user._id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'Permission denied');
                    res.redirect(req.get('Referrer') || '/')
                }
            })
            .catch(err => {
                req.flash('error', 'User not found');
                res.redirect(req.get('Referrer') || '/')
            });
    } else {
        req.flash('error', 'Please Login first!');
        res.redirect('/login')
    }
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated,
    checkPostOwnership,
    checkCommentOwnership,
    checkIsMe
}
