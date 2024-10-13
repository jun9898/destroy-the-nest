
const posts = [
    {
        id: 1,
        title: 'Post 1',
        body: 'Post 1 body',
        comments: [{
            id: 1,
            text: 'Comment 1',
            likes: 10
        }]
    },
    {
        id: 2,
        title: 'Post 2',
        body: 'Post 2 body',
        comments: []
    }
]

function getAllPosts() {
    return posts;
}

function getPostById(id) {
    return posts.find(post => post.id === Number(id));
}

function createPost(id, title, body) {
    const newPost = {
        id: id,
        title: title,
        body: body,
        comments: []
    }
    posts.push(newPost)
    return newPost
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost
}