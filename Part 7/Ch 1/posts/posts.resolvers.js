const postsModels = require('./posts.model');
module.exports = {
    Query: {
        posts: () => {
            return postsModels.getAllPosts();
        },
        post: (_, args) => {
            return postsModels.getPostById(args.id);
        }
    },
    Mutation: {
        createPost: (_, args) => {
            console.log(args);
            return postsModels.createPost(args.id, args.title, args.body);
        }
    }
}
