const express = require("express");
const ScheduleController = require("../app/controllers/ScheduleController");
const scheduleValidator = require("../app/validators/scheduleValidator.js");
const routes = express.Router();
const { onlyUsers } = require("../app/middlewares/session");

/* Schedule */
routes.get("/schedule", onlyUsers, ScheduleController.index);
// routes.post(
//   "/cities",
//   onlyUsers,
//   cityValidator.changeCity,
//   CityController.changeCity
// );

module.exports = routes;
