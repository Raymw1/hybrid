/* eslint-disable camelcase */
const Room = require("../app/models/Room");
const Desk = require("../app/models/Desk");

async function createDesks(roomId) {
  const city_id = Math.ceil(Math.random() * 2);
  const { id, limits } = await Room.create({
    city_id,
    limits: 6,
  });
  for (let i = 1; i <= limits; i++) {
    await Desk.create({ room_id: id, position: i });
  }
}

async function init() {
  for (let i = 1; i <= 4; i++) {
    await createDesks(i);
  }
  console.log("Rooms and desks created 🚀");
  process.exit();
}

init();
