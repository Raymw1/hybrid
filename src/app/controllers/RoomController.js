/* eslint-disable camelcase */
const Desk = require("../models/Desk");
const Room = require("../models/Room");
const User = require("../models/User");
const { getRoomsAdmin } = require("../services/roomServices");
const { getSchedules } = require("../services/scheduleServices");

module.exports = {
  async index(req, res) {
    try {
      const cities = await getRoomsAdmin();
      return res.render("admin/rooms", { cities });
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
  async create(req, res) {
    return res.render("admin/createRoom");
  },
  async post(req, res) {
    try {
      const { room, city, desks } = req.body;
      const { id: room_id } = await Room.create({
        room,
        city_id: city,
        limits: desks,
      });
      for (let i = 1; i <= desks; i++) {
        await Desk.create({ room_id, position: i });
      }
      const cities = await getRoomsAdmin();
      return res.render("admin/rooms", { cities });
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
      const { id } = req.body;
      await Desk.deleteIf({ where: { room_id: id } });
      await Room.delete(id);
      const cities = await getRoomsAdmin();
      return res.render("admin/rooms", {
        cities,
        success: "Sala removida com sucesso!",
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
};
