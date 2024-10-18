const SessionController = require("../controllers/session.constroller")

const express = require("express");

const sessionRouter = express.Router();

sessionRouter.post("/", SessionController.createSession);

module.exports = sessionRouter
