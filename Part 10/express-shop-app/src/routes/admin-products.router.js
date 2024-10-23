const express = require('express');
const {checkAdmin} = require("../middlewares/auth");
const Category = require("../models/categories.model");
const router = express.Router();

router.get('/add-product', checkAdmin, async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.render('admin/add-product', { categories: categories });
    } catch (err) {
        console.error(err);
        next(err)
    }
});

router.post('/', checkAdmin, (req, res, next) => {

});

module.exports = router;
