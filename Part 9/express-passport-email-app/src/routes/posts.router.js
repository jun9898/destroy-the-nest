const express = require('express');
const multer = require('multer');
const {checkAuthenticated, checkPostOwnership} = require("../middlewares/auth");
const router = express.Router();
const Post = require('../models/posts.model');
const path = require('path');

const storageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/assets/images'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storageEngine }).single('image');

router.post('/', checkAuthenticated, upload, (req, res, next) => {
    let desc = req.body.desc;
    let image = req.file ? req.file.filename : "";

    Post.create({
        image: image,
        description: desc,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    })
        .then(_ => {
            req.flash('success', '포스트가 생성되었습니다.');
            res.redirect('/posts');
        })
        .catch(err => {
            req.flash('error', '포스트 생성 실패.');
            res.redirect('/posts');
            // next(err);
        });
});

router.get('/', checkAuthenticated, (req, res) => {
    // populate는 join과 비슷한 역할을 한다.
    Post.find()
        .populate('comments')
        .sort({ createdAt: 'desc' })
        .exec()
        .then(posts => {
            res.render('posts', {
                posts: posts,
            });
        })
        .catch(err => {
            console.error(err);
        });
});

router.get('/:id/edit', checkPostOwnership, (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            res.render('posts/edit', {
                post: post
            });
        })
        .catch(err => {
            res.redirect('/posts');
        });
});

router.put('/:id', checkPostOwnership, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
        .then(_ => {
            req.flash('success', 'Post updated successfully');
            res.redirect('/posts');
        })
        .catch(err => {
            req.flash('error', 'Post updated failed');
            res.redirect('/posts');
        });
});

router.delete('/:id', checkPostOwnership, (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(_ => {
            req.flash('success', 'Post deleted successfully');
            res.redirect('/posts');
        })
        .catch(err => {
            req.flash('error', 'Post delete failed');
            res.redirect('/posts');
        });
});

module.exports = router;
