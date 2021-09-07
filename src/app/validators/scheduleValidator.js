/* eslint-disable no-useless-escape */
const City = require("../models/City");

module.exports = {
  async changeCity(req, res, next) {
    const city = await City.find(req.body.cityId);
    if (!city)
      return res.render("cities", {
        error: "Cidade inválida, tente novamente!",
      });
    next();
  },
};
