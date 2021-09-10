const db = require("./database");
// const { createDesks } = require("./seed");
db.connect();

async function initDb() {
  await db.query(`
  DROP TABLE IF EXISTS "schedules";
  DROP TABLE IF EXISTS "desks";
  DROP TABLE IF EXISTS "rooms";
  DROP TABLE IF EXISTS "users";
  DROP TABLE IF EXISTS "cities";
  DROP TABLE IF EXISTS "session";
  `);

  await db.query(`
  CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    city VARCHAR(100) NOT NULL
  );`);

  await db.query(
    `CREATE TABLE IF NOT EXISTS users 
      (id SERIAL PRIMARY KEY, 
        name VARCHAR(100) NOT NULL, 
        email VARCHAR(100) UNIQUE NOT NULL, 
        phone VARCHAR(100) UNIQUE NOT NULL, 
        password text NOT NULL, 
        city_id integer NOT NULL DEFAULT 0, 
        reset_token text,
        reset_token_expires text,
        is_admin boolean NOT NULL DEFAULT false);`
  );

  await db.query(`
  CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    room integer NOT NULL,
    city_id integer NOT NULL,
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
    `CREATE TABLE "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
      )
      WITH (OIDS=FALSE);
      ALTER TABLE "session" 
      ADD CONSTRAINT "session_pkey"
      PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;`
  );

  await db.query(
    `ALTER TABLE users ADD FOREIGN KEY (city_id) REFERENCES cities (id);`
  );
  await db.query(
    `ALTER TABLE rooms ADD FOREIGN KEY (city_id) REFERENCES cities (id);`
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

  await db.query(
    `ALTER TABLE desks DROP CONSTRAINT desks_room_id_fkey, 
    ADD CONSTRAINT desks_room_id_fkey FOREIGN KEY (room_id) REFERENCES rooms (id)
    ON DELETE CASCADE;`
  );

  await db.query(
    `ALTER TABLE schedules DROP CONSTRAINT schedules_user_id_fkey, 
    ADD CONSTRAINT schedules_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE;`
  );

  await db.query(
    `ALTER TABLE schedules DROP CONSTRAINT schedules_desk_id_fkey, 
    ADD CONSTRAINT schedules_desk_id_fkey FOREIGN KEY (desk_id) REFERENCES desks (id)
    ON DELETE CASCADE;`
  );

  await db.query(`INSERT INTO cities (city) VALUES ('São Paulo')`);
  await db.query(`INSERT INTO cities (city) VALUES ('Santos')`);

  console.log("Database and tables created 🚀");
  process.exit();
}

initDb();
