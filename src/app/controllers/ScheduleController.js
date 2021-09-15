/* eslint-disable camelcase */
const { getNextDays, parseDate } = require("../../lib/utils");
const Schedule = require("../models/Schedule");
const User = require("../models/User");
const City = require("../models/City");
const roomServices = require("../services/roomServices");
const Desk = require("../models/Desk");
const { getSchedules } = require("../services/scheduleServices");
const Room = require("../models/Room");

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
    const dateTime = parseDate(day).dayAndMonth;
    const { city: cityName } = await City.find(cityId);
    return res.render("rooms", { rooms, day, dateTime, cityName });
  },
  async post(req, res) {
    try {
      let { day, desk } = req.body;
      const id = await Schedule.create({
        schedule: day,
        user_id: req.session.userId,
        desk_id: desk,
      });
      desk = await Desk.find(desk);
      const room = (await Room.find(desk.room_id)).room;
      desk = desk.position;
      const { city } = await City.find(req.session.cityId);
      const gcalendar = `https://calendar.google.com/calendar/u/0/r/eventedit?text=Fcamara&location=${city}&dates=${
        parseDate(day).gcalendar1
      }/${parseDate(day).gcalendar2}`;
      req.session.day = undefined;
      req.session.cityId = undefined;
      req.session.save((error) => {
        if (error) throw error;
        return res.render("successSchedule", {
          day: parseDate(day).format,
          gcalendar,
          room,
          desk,
        });
      });
    } catch (err) {
      console.error(err);
      const { name } = await User.find(req.session.userId);
      const schedules = await getSchedules(req.session.userId);
      return res.render("index", {
        name,
        schedules,
        error: "Erro inesperado, tente novamente!",
      });
    }
  },
  async delete(req, res) {
    try {
      await Schedule.delete(req.body.id);
      const { name } = await User.find(req.session.userId);
      const schedules = await getSchedules(req.session.userId);
      return res.render("index", {
        name,
        schedules,
        success: "Agendamento cancelado!",
      });
    } catch (err) {
      console.error(err);
      const { name } = await User.find(req.session.userId);
      const schedules = await getSchedules(req.session.userId);
      return res.render("index", {
        name,
        schedules,
        error: "Permissão negada para cancelar agendamento!",
      });
    }
  },
};
