const express = require("express");
const routes = express.Router();
const users = require("./users");
const cities = require("./cities");
const schedule = require("./schedule");
const { onlyUsers } = require("../app/middlewares/session");
const User = require("../app/models/User");
const { getSchedules } = require("../app/services/scheduleServices");

routes.get("/", onlyUsers, async (req, res) => {
  try {
    const { name } = await User.find(req.session.userId);
    const schedules = await getSchedules(req.session.userId);
    return res.render("index", { name, schedules });
  } catch (err) {
    console.error(err);
    return res.render("signup", {
      error: "Erro inesperado, tente novamente!",
    });
  }
});

routes.use(users);
routes.use(cities);
routes.use(schedule);

module.exports = routes;
