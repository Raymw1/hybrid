const express = require("express");
const routes = express.Router();
const users = require("./users");

routes.get("/", (req, res) => {
  return res.render("index");
});

routes.get("/signup", (req, res) => {
  return res.render("signup");
});

routes.get("/login", (req, res) => {
  return res.render("login");
});

routes.get("/unities", (req, res) => {
  return res.render("unities");
});

routes.get("/rooms", (req, res) => {
  return res.render("rooms");
});

routes.use(users);

module.exports = routes;
