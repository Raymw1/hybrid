const express = require("express");
const routes = express.Router();
const { onlyAdmins } = require("../app/middlewares/session");
const RoomController = require("../app/controllers/RoomController");
const roomValidator = require("../app/validators/roomValidator");

routes.get("/", onlyAdmins, RoomController.index);
routes.get("/create", onlyAdmins, RoomController.create);
routes.post("/", onlyAdmins, roomValidator.post, RoomController.post);
routes.delete("/", onlyAdmins, roomValidator.delete, RoomController.delete);

module.exports = routes;
