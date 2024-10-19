const crypto = require('crypto');
const messageModel = require('../models/messages.model');

const getToken = (sender, receiver) => {
    const key = [sender, receiver].sort().join('_');
    return key;
};

const randomId = () => crypto.randomBytes(8).toString('hex');

const saveMessage = async ({ from, to, message, time }) => {
    const token = getToken(from, to);
    const data = {
        from,
        message,
        time: new Date(`${new Date().toDateString()} ${time}`)
    }
    try {
        await messageModel.updateOne(
            { userToken: token },
            { $push: { messages: data } }
        );
    } catch (err) {
        console.error('Error saving message:', err);
    }
}

const fetchMessages = async (io, sender, receiver) => {
    const token = getToken(sender, receiver);
    const foundToken = await messageModel.findOne({ userToken: token });
    if (foundToken) {
        io.to(sender).emit('stored-messages', { messages: foundToken.messages });
    } else {
        const data = {
            userToken: token,
            messages: []
        }
        const message = new messageModel(data);
        const savedMessages = message.save();
        if (savedMessages) {
            console.log('Messages saved');
        } else {
            console.error('Error saving messages');
        }
    }
}


module.exports = {
    randomId,
    saveMessage,
    fetchMessages
}