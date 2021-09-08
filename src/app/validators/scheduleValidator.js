/* eslint-disable no-useless-escape */
const { getNextDays } = require("../../lib/utils");
const City = require("../models/City");
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
    const { day, desk } = req.body;
    const days = getNextDays(6);
    let dayLimit = false;
    days.forEach((dateday) => {
      if (dateday.datetime === day) return (dayLimit = true);
    });
    if (!dayLimit)
      return res.render("schedule", {
        days,
        error: "Dia inválido!",
        cityId: req.session.cityId,
      });
    if (!desk)
      return res.render("rooms", {
        rooms: await roomServices.getRooms(req.session.cityId, day),
        day,
        error: "Insira uma sala!",
      });
    next();
  },
};
