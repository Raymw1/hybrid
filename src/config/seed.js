/* eslint-disable camelcase */
const Room = require("../app/models/Room");
const Desk = require("../app/models/Desk");

module.exports = {
  async createDesks(roomId) {
    const city_id = Math.ceil(Math.random() * 2);
    const { id, limits } = await Room.create({
      id: roomId,
      city_id,
      limits: 6,
    });
    for (let i = 1; i <= limits; i++) {
      await Desk.create({ room_id: id, position: i });
    }
  },
};
