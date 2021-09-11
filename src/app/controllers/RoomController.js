/* eslint-disable camelcase */
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
      return res.render("index", { name, schedules });
    }
  },
  async changeCity(req, res) {
    const { cityId } = req.body;
    await User.update(req.session.userId, { city_id: cityId });
    return res.render("cities", {
      cityId,
      success: "Unidade atualizada com sucesso!",
    });
  },
};
