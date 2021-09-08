/* eslint-disable camelcase */
// const RecipeFiles = require("../model/RecipeFiles");
const Room = require("../models/Room");
const Desk = require("../models/Desk");
const Schedule = require("../models/Schedule");

async function getDeskInfo(desk_id) {
  return {
    id: desk_id,
    occuped: !!(await Schedule.findOne({ where: { desk_id } })),
  };
}

async function getDesks(room_id) {
  const desks = await Desk.findAll({ where: { room_id } });
  const desksPromise = desks.map(async (desk) => await getDeskInfo(desk.id));
  return Promise.all(desksPromise);
}

async function getRooms() {
  try {
    const rooms = await Room.findAll();
    const roomsPromise = rooms.map(async (room) => ({
      desks: await getDesks(room.id),
    }));
    return Promise.all(roomsPromise);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getRooms,
  getDesks,
  getDeskInfo,
};
