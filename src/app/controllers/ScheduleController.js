/* eslint-disable camelcase */
const User = require("../models/User");
// const City = require("../models/City");

module.exports = {
  async index(req, res) {
    // const cities = await City.findAll();
    const cityId = (await User.find(req.session.userId)).city_id;
    return res.render("schedule", { cityId });
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
