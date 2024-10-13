const comments = [
    {
        id: 1,
        text: 'Comment 1',
        likes: 10
    },
    {
        id: 2,
        text: 'Comment 2',
        likes: 20
    },
    {
        id: 3,
        text: 'Comment 3',
        likes: 30
    },
    {
        id: 4,
        text: 'Comment 4',
        likes: 40
    },
]

function getAllComments() {
    return comments;
}

function getCommentsByLikes(minLikes) {
    return comments.filter(comment => comment.likes >= minLikes);
}

function createComment(id, text) {
    const newComment = {
        id: id,
        text: text,
        likes: 0
    }
    comments.push(newComment);
    return newComment;
}


module.exports = {
    getAllComments,
    getCommentsByLikes,
    createComment
}
