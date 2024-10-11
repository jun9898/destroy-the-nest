import express from "express";
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../controller/user.contoller";
const UserRouter = express.Router();

UserRouter.post('/', createUser);
UserRouter.get('/', getUsers)
UserRouter.get('/:userId', getUser)
UserRouter.put('/:userId', updateUser)
UserRouter.delete('/:userId', deleteUser)

export { UserRouter };

