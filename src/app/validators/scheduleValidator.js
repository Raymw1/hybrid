/* eslint-disable no-useless-escape */
const { getNextDays, parseDate } = require("../../lib/utils");
const City = require("../models/City");
const Desk = require("../models/Desk");
const Schedule = require("../models/Schedule");
const roomServices = require("../services/roomServices");

module.exports = {
  async schedule(req, res, next) {
    const { day, cityId } = req.body;
    const days = getNextDays(6);
    if (!day)
      return res.render("schedule", { days, error: "Insira um dia!", cityId });
    let dayLimit = false;
    days.forEach((dateday) => {
      if (dateday.datetime === day) return (dayLimit = true);
    });
    if (!dayLimit)
      return res.render("schedule", { days, error: "Dia inválido!", cityId });
    const city = await City.find(req.body.cityId);
    if (!city)
      return res.render("schedule", {
        days,
        day,
        error: "Cidade inválida, tente novamente!",
      });
    next();
  },
  async post(req, res, next) {
    const { day, desk: deskId } = req.body;
    const { cityId } = req.session;
    const days = getNextDays(6);
    let dayLimit = false;
    const dateTime = parseDate(day).dayAndMonth;
    const { city: cityName } = await City.find(cityId);
    days.forEach((dateday) => {
      if (dateday.datetime === day) return (dayLimit = true);
    });
    if (!dayLimit)
      return res.render("schedule", {
        days,
        dateTime,
        cityName,
        error: "Dia inválido!",
        cityId: req.session.cityId,
      });
    if (!deskId)
      return res.render("rooms", {
        rooms: await roomServices.getRooms(req.session.cityId, day),
        day,
        dateTime,
        cityName,
        error: "Insira uma mesa!",
      });
    const desk = await Desk.find(deskId);
    if (!desk)
      return res.render("rooms", {
        rooms: await roomServices.getRooms(req.session.cityId, day),
        day,
        dateTime,
        cityName,
        error: "Mesa inválida!",
      });
    const schedule = !!(await Schedule.findOne({
      where: { desk_id: deskId },
      and: { schedule: day },
    }));
    if (schedule)
      return res.render("rooms", {
        rooms: await roomServices.getRooms(req.session.cityId, day),
        day,
        dateTime,
        cityName,
        error: "Mesa indisponível!",
      });
    next();
  },
};
