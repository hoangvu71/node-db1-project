const express = require("express");

const db = require("../data/dbConfig.js");
const usersRouter = require("./usersRouter")
const server = express();

server.use(express.json());
server.use("/users", usersRouter)




module.exports = server;
