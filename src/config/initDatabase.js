const db = require("./database");
// db.connect();

async function initDb() {
  await db.query(`
  CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    city text NOT NULL
  );`);

  await db.query(
    `CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name text NOT NULL, email text UNIQUE NOT NULL, phone text UNIQUE NOT NULL, region_id integer NOT NULL DEFAULT 0, is_admin boolean NOT NULL DEFAULT false);`
  );

  await db.query(`
  CREATE TABLE IF NOT EXISTS rooms (
    id integer PRIMARY KEY,
    region_id integer NOT NULL,
    limits integer NOT NULL
  );`);

  await db.query(`
  CREATE TABLE IF NOT EXISTS desks (
    id SERIAL PRIMARY KEY,
    room_id integer NOT NULL,
    position integer NOT NULL
  );`);

  await db.query(`
  CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    schedule timestamp NOT NULL,
    user_id integer NOT NULL,
    desk_id integer NOT NULL
  );`);

  await db.query(
    `ALTER TABLE users ADD FOREIGN KEY (region_id) REFERENCES cities (id);`
  );
  await db.query(
    `ALTER TABLE rooms ADD FOREIGN KEY (region_id) REFERENCES cities (id);`
  );

  await db.query(
    `ALTER TABLE desks ADD FOREIGN KEY (room_id) REFERENCES rooms (id);`
  );

  await db.query(
    `ALTER TABLE schedules ADD FOREIGN KEY (user_id) REFERENCES users (id);`
  );

  await db.query(
    `ALTER TABLE schedules ADD FOREIGN KEY (desk_id) REFERENCES desks (id);`
  );
  db.end();
  console.log("Database and tables created 🚀");
}

initDb();
