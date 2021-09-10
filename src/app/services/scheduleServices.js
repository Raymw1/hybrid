/* eslint-disable camelcase */
// const RecipeFiles = require("../model/RecipeFiles");
const Room = require("../models/Room");
const Desk = require("../models/Desk");
const Schedule = require("../models/Schedule");
const City = require("../models/City");
const { parseDate } = require("../../lib/utils");

async function getRoomAndUNity(desk_id) {
  const desk = await Desk.find(desk_id);
  const room = await Room.find(desk.room_id);
  const unity = await City.find(room.city_id);
  return { room: room.room, unity: unity.city };
}

async function getSchedules(user_id) {
  try {
    const schedules = await Schedule.findAll({ where: { user_id } });
    const schedulesPromise = schedules.map(async (schedule) => ({
      scheduleId: schedule.id,
      day: parseDate(schedule.schedule).birthday,
      date: parseDate(schedule.schedule).dayAndMonth,
      desk: (await Desk.find(schedule.desk_id)).position,
      ...(await getRoomAndUNity(schedule.desk_id)),
    }));
    return Promise.all(schedulesPromise);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getSchedules,
};
