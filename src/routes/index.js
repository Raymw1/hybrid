const express = require("express");
const routes = express.Router();

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

module.exports = routes;
