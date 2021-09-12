/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */
const City = require("../models/City");
const { verifyForm } = require("./mainValidator");
const Room = require("../models/Room");

module.exports = {
  async post(req, res, next) {
    const emptyFields = verifyForm(req.body);
    if (emptyFields) return res.render("createRoom", { ...emptyFields });
    const { city: cityId, room: roomId, desks } = req.body;
    const city = await City.find(cityId);
    if (!city)
      return res.render("admin/createRoom", {
        data: req.body,
        error: "Cidade inválida!",
      });
    const room = await Room.findOne({
      where: { room: roomId },
      and: { city_id: cityId },
    });
    if (room)
      return res.render("admin/createRoom", {
        data: req.body,
        error: "Esta sala já existe!",
      });
    if (desks < 4 || desks > 20)
      return res.render("admin/createRoom", {
        data: req.body,
        error: "Número de mesas inválido",
      });
    const availableDesks = await Room.countDesks(cityId);
    if (
      (cityId == 1 && Number(availableDesks) + Number(desks) > 240) ||
      (cityId == 2 && Number(availableDesks) + Number(desks) > 40)
    ) {
      return res.render("admin/createRoom", {
        data: req.body,
        error: "Número de mesas excedeu o limite!",
      });
    }
    next();
  },
};
