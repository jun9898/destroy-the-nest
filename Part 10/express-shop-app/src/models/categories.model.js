const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    title: {
        type:String,
        unique: true,
        required: true,
    },
    slug: {
        type: String,
    }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;

