const express = require('express');
const Comment = require('../models/comments.model');
const {checkAuthenticated, checkCommentOwnership} = require("../middlewares/auth");
const Post = require("../models/posts.model");
const router = express.Router({ mergeParams: true });

router.post('/', checkAuthenticated, (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            Comment.create(Comment.toEntity(req))
                .then(comment => {
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    req.flash('success', 'Comment created successfully');
                    res.redirect(req.get('Referrer') || '/')
                })
                .catch(err => {
                    req.flash('error', 'Comment creation failed');
                    res.redirect(req.get('Referrer') || '/')
                });
        })
        .catch(err => {
            req.flash('error', 'Post not found');
            res.redirect(req.get('Referrer') || '/')
        });
})

router.delete('/:commentId', checkCommentOwnership, (req, res) => {
    Comment.findByIdAndDelete(req.params.commentId)
        .then(post => {
            req.flash('success', 'Comment deleted successfully');
        })
        .catch(err => {
            req.flash('error', 'Comment not found');
        })
        .finally(() => {
            res.redirect(req.get('Referrer') || '/')
        });
});

router.put('/:commentId', checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentId, req.body)
        .then(post => {
            req.flash('success', 'Comment updated successfully');
            res.redirect('/posts')
        })
        .catch(err => {
            req.flash('error', 'Comment not found');
            res.redirect('back')
        })
});

router.get('/:commentId/edit', checkCommentOwnership, (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            console.log(post)
            res.render('comments/edit', {
                post: post,
                comment: req.comment
            })
        })
        .catch(err => {
            req.flash('error', 'Post not found');
            res.redirect(req.get('Referrer') || '/')
        });
})

module.exports = router;