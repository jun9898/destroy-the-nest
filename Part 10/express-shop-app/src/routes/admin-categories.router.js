const express = require('express');
const {checkAdmin} = require("../middlewares/auth");
const router = express.Router();

router.get('/add-category', checkAdmin, (req, res) => {
    res.render('admin/add-category');
});

module.exports = router;