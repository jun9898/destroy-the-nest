const express = require('express');
const {checkAdmin} = require("../middlewares/auth");
const router = express.Router();
const Category = require('../models/categories.model');
const EXISTS_CATEGORY = 11000

router.get('/add-category', checkAdmin, (req, res) => {
    res.render('admin/add-category');
});

router.post('/add-category', checkAdmin, (req, res, next) => {
    const title = req.body.title;
    const slug = title.replace(/\s+/g, '-').toLowerCase();

    Category.create({ title, slug })
        .then(() => {
            req.flash('success', 'Category added successfully');
            res.redirect('back');
        })
        .catch(err => {
            // 에러가 발생했을 때, 중복된 slug로 인한 에러인지 확인
            if (err.code === EXISTS_CATEGORY) { // MongoDB에서 unique 위반 시 발생하는 에러 코드
                req.flash('error', 'Category already exists');
                res.redirect('back');
            } else {
                console.log(err);
                next(err)
            }
        });
});

router.get('/', checkAdmin, async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.render('admin/categories', { categories: categories });
    } catch (err) {
        console.error(err);
        next(err)
    }
});

router.delete('/:id', checkAdmin, async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        req.flash('success', 'Category deleted successfully');
        res.redirect('back');
    } catch (err) {
        console.error(err);
        next(err)
    }
});

module.exports = router;