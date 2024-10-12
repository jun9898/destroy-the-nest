const db = require('../models')

const User = db.users;

function createUser(req, res) {
    const user = req.body;
    User.create(user)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '유저 생성 실패'
            })
        })
}

function findAllUsers(req, res) {
    User.findAll()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '유저 조회 실패'
            })
        })
}

function findUserById(req, res) {
    User.findByPk(req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '유저 조회 실패'
            })
        })
}

function updateUser(req, res) {
    const id = req.params.id;
    User.update(req.body, {
        where: { id: id }
    })
        .then(result => {
            if (result === true) {
                res.send({
                    message: '유저 수정 성공'
                })
            } else {
                res.send({
                    message: '유저 수정 실패'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '유저 수정 실패'
            })
        })
}

function deleteUser(req, res) {
    User.destroy({
        where: { id: req.params.id }
    })
        .then(result => {
            if (result === 1) {
                res.send({
                    message: '유저 삭제 성공'
                })
            } else {
                res.send({
                    message: '유저 삭제 실패'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '유저 삭제 실패'
            })
        })
}

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    updateUser,
    deleteUser
}