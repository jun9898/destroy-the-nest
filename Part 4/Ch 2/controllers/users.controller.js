const { Users } = require('../models/Users');

function getUsers(req, res) {
    res.json(Users);
}

function getUser(req, res) {
    const userId = Number(req.params.userId); // userId로 수정
    const user = Users[userId];
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}

function postUser(req, res) {
    if (!req.body.name) {
        return res.status(400).send('missing user name');
    }
    const newUser = {
        name: req.body.name,
        id: Users.length,
    };
    Users.push(newUser);
    res.json(newUser);
}

// CommonJS 방식으로 내보내기
module.exports = {
    getUsers,
    getUser,
    postUser,
};
