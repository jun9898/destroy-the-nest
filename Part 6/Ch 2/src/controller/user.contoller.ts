import {AppDataSource} from "../data-source";

async function createUser(req, res) {
    const user = AppDataSource.getRepository('User').create(req.body);
    await AppDataSource.getRepository('User').save(user);
    res.status(201).json(user);
}

async function getUsers(req, res) {
    const users = await AppDataSource.getRepository('User').find();
    res.status(200).json(users);
}

async function getUser(req, res) {
    const user = await AppDataSource.getRepository('User').findOneBy({id: Number(req.params.userId)});
    res.status(200).json(user);
}

async function updateUser(req, res) {
    const user = await AppDataSource.getRepository('User').findOneBy({id: Number(req.params.userId)});
    AppDataSource.getRepository('User').merge(user, req.body);
    const result = await AppDataSource.getRepository('User').save(user);
    res.status(200).json(result);
}

async function deleteUser(req, res) {
    const user = await AppDataSource.getRepository('User').findOneBy({id: Number(req.params.userId)});
    const result = await AppDataSource.getRepository('User').remove(user);
    res.status(200).json(result);
}

export {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};