/* eslint-disable camelcase */
// const RecipeFiles = require("../model/RecipeFiles");
const Room = require("../models/Room");
const Desk = require("../models/Desk");
const Schedule = require("../models/Schedule");
const { parseDate } = require("../../lib/utils");

async function getDeskPosition(desk_id) {
  return (await Desk.find(desk_id)).position;
}

async function getRoom(desk_id) {
  const desk = await Desk.find(desk_id);
  return (await Room.find(desk.room_id)).id;
}

async function getSchedules(user_id) {
  try {
    const schedules = await Schedule.findAll({ where: { user_id } });
    const schedulesPromise = schedules.map(async (schedule) => ({
      scheduleId: schedule.id,
      day: parseDate(schedule.schedule).birthday,
      room: await getRoom(schedule.desk_id),
      desk: await getDeskPosition(schedule.desk_id),
    }));
    return Promise.all(schedulesPromise);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getSchedules,
};
