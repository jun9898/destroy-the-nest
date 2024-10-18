const { default: mongoose } = require('mongoose');

const messagesSchema = mongoose.Schema({
    userToken: {
        type: String,
        required: true
    },
    messages: [
        {
            from: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            time: {
                type: Date,
                required: true
            }
        }
    ]
})

const messageModel = mongoose.model('Messages', messagesSchema);
module.exports = messageModel;