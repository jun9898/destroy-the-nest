const express = require('express');
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");
const path = require("node:path");
const ApolloServer = require("@apollo/server").ApolloServer; // 변경된 부분
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require('cors');
const json = require('body-parser');
const loadedResolvers = loadFilesSync(path.join(__dirname, './**/*.resolvers.js'));

const loadedTypes = loadFilesSync('**/*', {
    extensions: ['graphql']
});

const PORT = 4000;

async function startApolloServer() {

    const app = express();

    const schema = makeExecutableSchema({
        typeDefs: loadedTypes,
        resolvers: loadedResolvers
    });

    const server = new ApolloServer({ schema });

    await server.start();

    app.use(
        '/graphql',
        cors(),
        json.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }), // 수정된 부분
        }),
    );

    app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}/graphql`);
    });
}

startApolloServer().catch(err => {
    console.error(err);
});
