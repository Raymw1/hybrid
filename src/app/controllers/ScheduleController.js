/* eslint-disable camelcase */
const { getNextDays, parseDate } = require("../../lib/utils");
const User = require("../models/User");
// const City = require("../models/City");

module.exports = {
  async index(req, res) {
    // const cities = await City.findAll();
    const days = getNextDays(6);
    const cityId = (await User.find(req.session.userId)).city_id;
    return res.render("schedule", { cityId, days });
  },
  async schedule(req, res) {
    return res.send("Ok");
  },
};
