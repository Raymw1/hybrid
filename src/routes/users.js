const express = require("express");
const SessionController = require("../app/controllers/SessionController");
const routes = express.Router();
const UserController = require("../app/controllers/UserController");

/* REGISTER*/
routes.get("/", UserController.index);//post e /login 
routes.post("/signup", UserController.post);

/* LOGIN*/
routes.get("/login", SessionController.loginForm); //tem validadores aqui nas rotas get e post de login
routes.post("/login", SessionController.login);
routes.post("/logout", SessionController.logout);

module.exports = routes;
