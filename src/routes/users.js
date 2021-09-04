const express = require("express");
const routes = express.Router();
const UserController = require("../app/controllers/UserController");

routes.get("/", UserController.index);
routes.post("/signup", UserController.post);

module.exports = routes;
