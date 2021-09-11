const express = require("express");
const routes = express.Router();
const SessionController = require("../app/controllers/SessionController");
const UserController = require("../app/controllers/UserController");
const sessionValidator = require("../app/validators/sessionValidator");
const userValidator = require("../app/validators/userValidator");
const { onlyUsers } = require("../app/middlewares/session");

routes.get("/signup", (req, res) => {
  return res.render("signup");
});
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

/* EDIT */
routes.get("/users/edit", onlyUsers, UserController.editForm); // tem validadores aqui nas rotas get e post de login
routes.put("/users", onlyUsers, userValidator.put, UserController.put); // tem validadores aqui nas rotas get e post de login
routes.delete("/users", onlyUsers, userValidator.delete, UserController.delete); // tem validadores aqui nas rotas get e post de login

module.exports = routes;
