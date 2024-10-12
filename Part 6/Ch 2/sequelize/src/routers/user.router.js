const express = require('express');
const UserRouter = express.Router();

const UserController = require('../controllers/user.controller');

UserRouter.post('/', UserController.createUser);
UserRouter.get('/', UserController.findAllUsers);
UserRouter.get('/:id', UserController.findUserById);
UserRouter.put('/:id', UserController.updateUser);
UserRouter.delete('/:id', UserController.deleteUser);


module.exports = UserRouter;