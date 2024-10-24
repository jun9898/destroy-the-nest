 Category = require('../models/categories.model');

async function getAllCategories(req, res, next) {
    try {
        res.locals.categories = await Category.find();
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    getAllCategories
}