const express = require("express");
const app = express();
const publicDirectoryPath = require("path").join(__dirname, "./public");

app.use(express.json());
app.use(express.static(publicDirectoryPath));

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});