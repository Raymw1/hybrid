/* eslint-disable camelcase */
const { getNextDays, parseDate } = require("../../lib/utils");
const Schedule = require("../models/Schedule");
const User = require("../models/User");
const roomServices = require("../services/roomServices");
// const City = require("../models/City");

module.exports = {
  async index(req, res) {
    // const cities = await City.findAll();
    const days = getNextDays(6);
    const cityId = (await User.find(req.session.userId)).city_id;
    return res.render("schedule", { cityId, days });
  },
  async schedule(req, res) {
    const { day, cityId } = req.body;
    req.session.day = day;
    req.session.cityId = cityId;
    req.session.save((error) => {
      if (error) throw error;
      return res.redirect("/desks");
    });
  },
  async desks(req, res) {
    const { day, cityId } = req.session;
    if (!day || !cityId)
      return res.render("schedule", {
        days: getNextDays(6),
        cityId: (await User.find(req.session.userId)).city_id,
        error: "Antes, preencha esta parte!",
      });
    const rooms = await roomServices.getRooms(cityId, day);
    return res.render("rooms", { rooms, day });
  },
  async post(req, res) {
    const { day, desk } = req.body;
    const id = await Schedule.create({
      schedule: day,
      user_id: req.session.userId,
      desk_id: desk,
    });
    req.session.day = undefined;
    req.session.cityId = undefined;
    req.session.save((error) => {
      if (error) throw error;
      return res.send(`Ok, ${id}`);
    });
  },
};
