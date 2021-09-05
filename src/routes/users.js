const express = require("express");
const SessionController = require("../app/controllers/SessionController");
const routes = express.Router();
const UserController = require("../app/controllers/UserController");
const sessionValidator = require("../app/validators/sessionValidator");

routes.get("/", UserController.index);
routes.post("/signup", UserController.post);

routes.post(
  "/forgot-password",
  sessionValidator.forgot,
  SessionController.forgot
);

routes.get("/password-reset", SessionController.resetForm);
routes.post("/password-reset", sessionValidator.reset, SessionController.reset);

module.exports = routes;
