const db = require("../../config/database");
db.connect();
const Base = require("./Base");

Base.init({ table: "rooms" });

module.exports = {
  ...Base,
  async create(fields) {
    try {
      let keys = [];
      let values = [];
      Object.keys(fields).forEach((key) => {
        keys.push(key);
        values.push(`'${fields[key]}'`);
      });
      keys = keys.join(",");
      values = values.join(",");
      let id = 1;
      if (!fields.room) {
        const results = await db.query(
          `SELECT count(*) FROM rooms WHERE city_id = ${fields.city_id};`
        );
        id = Number(results.rows[0].count) + 1 || id;
      } else {
        id = fields.room;
      }
      const query = `INSERT INTO rooms (${keys}, room) VALUES (${values}, ${id}) RETURNING id, limits`;
      const results = await db.query(query);
      return results.rows[0];
    } catch (err) {
      console.log(err);
    }
  },
};
