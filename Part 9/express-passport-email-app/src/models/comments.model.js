const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
}, {timestamps: true});

commentSchema.statics.toEntity = function(req) {
    return {
        text: req.body.text,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    };
};

module.exports = mongoose.model('Comment', commentSchema);
