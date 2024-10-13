const commentsModel = require('./comments.model');
const postsModels = require('../posts/posts.model');
const {getCommentsByLikes} = require("./comments.model");
module.exports = {
    Query: {
        comments: () => {
            commentsModel.getAllComments();
        },
        commentsByLikes: (_, args) => {
            return getCommentsByLikes(args.minLikes);
        }
    },
    Mutation: {
        createComment: (_, args) => {
            return commentsModel.createComment(args.id, args.text);
        }
    }
}
