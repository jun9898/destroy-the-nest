const {randomId} = require("../utils/messages");

function createSession(req, res) {
    let data = {
        username: req.body.username,
        userID: randomId()
    }
    console.log(data)
    res.json(data);
}

module.exports = {
    createSession
};