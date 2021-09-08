const express = require("express");
const ScheduleController = require("../app/controllers/ScheduleController");
const scheduleValidator = require("../app/validators/scheduleValidator.js");
const routes = express.Router();
const { onlyUsers } = require("../app/middlewares/session");

/* Schedule */
routes.get("/schedule", onlyUsers, ScheduleController.index);
routes.post(
  "/schedule",
  onlyUsers,
  scheduleValidator.schedule,
  ScheduleController.schedule
);
routes.get("/desks", onlyUsers, ScheduleController.desks);

module.exports = routes;
