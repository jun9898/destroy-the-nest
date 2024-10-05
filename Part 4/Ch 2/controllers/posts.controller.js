const path = require('path');
function getPost(req, res) {
    res.render('posts', {
        templateName: 'post',
    });
    // res.send('<div><h1>Post Title</h1><p>This is a post</p></div>');
    // res.sendFile(path.join(__dirname, "..", "public", "images", "514a59e095e1d0d4b2512729844fd3a4.jpg"));
}


module.exports = {
    getPost,
}