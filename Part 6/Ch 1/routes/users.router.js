const usersController = require("../controllers/users.controller");
const express = require("express");

const usersRouter = express.Router();

// User
usersRouter.get('/', usersController.getUsers);
usersRouter.get('/:userId', usersController.getUser);
usersRouter.post('/', usersController.postUser);

module.exports = usersRouter;