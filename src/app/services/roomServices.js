/* eslint-disable camelcase */
// const RecipeFiles = require("../model/RecipeFiles");
const Room = require("../models/Room");
const Desk = require("../models/Desk");
const Schedule = require("../models/Schedule");

async function getDeskInfo(desk_id, schedule) {
  return {
    id: desk_id,
    occuped: !!(await Schedule.findOne({
      where: { desk_id },
      and: { schedule },
    })),
  };
}

async function getDesks(room_id, schedule) {
  const desks = await Desk.findAll({ where: { room_id } });
  const desksPromise = desks.map(async (desk) => ({
    ...(await getDeskInfo(desk.id, schedule)),
    position: desk.position,
  }));
  return Promise.all(desksPromise);
}

async function getRooms(city_id, schedule) {
  try {
    const rooms = await Room.findAll({ where: { city_id } });
    const roomsPromise = rooms.map(async (room) => ({
      roomId: room.room,
      desks: await getDesks(room.id, schedule),
    }));
    return Promise.all(roomsPromise);
  } catch (err) {
    console.error(err);
  }
}

async function getRoomsAdmin() {
  try {
    let rooms = await Room.findAll();
    const roomsPromise = rooms.map(async (room) => ({
      room: room.room,
    }));
    await Promise.all(roomsPromise);
    const sp = rooms.filter((room) => room.city_id === 1);
    const sa = rooms.filter((room) => room.city_id === 2);
    rooms = [
      { name: "São Paulo", rooms: sp },
      { name: "Santos", rooms: sa },
    ];
    return rooms;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getRooms,
  getRoomsAdmin,
  getDesks,
  getDeskInfo,
};
