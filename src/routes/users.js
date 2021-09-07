const express = require("express");
const routes = express.Router();
const SessionController = require("../app/controllers/SessionController");
const UserController = require("../app/controllers/UserController");
const sessionValidator = require("../app/validators/sessionValidator");
const userValidator = require("../app/validators/userValidator");

routes.get("/", UserController.index);
routes.post("/signup", userValidator.post, UserController.post);

routes.post(
  "/forgot-password",
  sessionValidator.forgot,
  SessionController.forgot
);

routes.get("/password-reset", SessionController.resetForm);
routes.post("/password-reset", sessionValidator.reset, SessionController.reset);

/* LOGIN */
routes.get("/login", SessionController.loginForm); // tem validadores aqui nas rotas get e post de login
routes.post("/login", sessionValidator.login, SessionController.login);
routes.post("/logout", SessionController.logout);

module.exports = routes;
