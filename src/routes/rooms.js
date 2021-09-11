const express = require("express");
const routes = express.Router();
const { onlyAdmins } = require("../app/middlewares/session");
const RoomController = require("../app/controllers/RoomController");

routes.get("/", onlyAdmins, RoomController.index);

module.exports = routes;
