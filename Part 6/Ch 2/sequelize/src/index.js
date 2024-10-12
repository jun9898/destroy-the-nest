const express = require('express');
const UserRouter = require("./routers/user.router");
const db = require("./models");

const app = express();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and re-sync db.');
// });

app.use(express.json());
app.use('/users', UserRouter)

const PORT = 4000;

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})