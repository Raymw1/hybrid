const express = require("express");
const routes = express.Router();
const SessionController = require("../app/controllers/SessionController");
const UserController = require("../app/controllers/UserController");
const sessionValidator = require("../app/validators/sessionValidator");
const userValidator = require("../app/validators/userValidator");
const {
  onlyUsers,
  isLogged,
  checkIfIsOwnOrAdmin,
  onlyAdmins,
} = require("../app/middlewares/session");

routes.get("/signup", isLogged, (req, res) => {
  return res.render("signup");
});
routes.post("/signup", isLogged, userValidator.post, UserController.post);

routes.post(
  "/forgot-password",
  sessionValidator.forgot,
  SessionController.forgot
);

routes.get("/password-reset", SessionController.resetForm);
routes.post("/password-reset", sessionValidator.reset, SessionController.reset);

/* LOGIN */
routes.get("/login", isLogged, SessionController.loginForm);
routes.post(
  "/login",
  isLogged,
  sessionValidator.login,
  SessionController.login
);
routes.post("/logout", SessionController.logout);

routes.get("/users", onlyAdmins, UserController.index);

routes.get("/users/create", onlyAdmins, UserController.create);

routes.post("/users", onlyAdmins, userValidator.create, UserController.post);

routes.get(
  "/users/:id/edit",
  onlyUsers,
  checkIfIsOwnOrAdmin,
  UserController.editForm
);

routes.post(
  "/users/change-password",
  onlyUsers,
  userValidator.changePassword,
  UserController.changePassword
);

routes.put(
  "/users",
  onlyUsers,
  checkIfIsOwnOrAdmin,
  userValidator.put,
  UserController.put
);

routes.delete(
  "/users",
  onlyUsers,
  checkIfIsOwnOrAdmin,
  userValidator.delete,
  UserController.delete
);

module.exports = routes;
