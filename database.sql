CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "phone" text UNIQUE NOT NULL,
  "region_id" integer NOT NULL DEFAULT 0,
  "is_admin" boolean NOT NULL DEFAULT false
);

CREATE TABLE "cities" (
  "id" SERIAL PRIMARY KEY,
  "city" text NOT NULL
);

CREATE TABLE "rooms" (
  "id" integer PRIMARY KEY,
  "region_id" integer NOT NULL,
  "limit" integer NOT NULL
);

CREATE TABLE "desks" (
  "id" SERIAL PRIMARY KEY,
  "room_id" integer NOT NULL,
  "position" integer NOT NULL
);

CREATE TABLE "schedules" (
  "id" SERIAL PRIMARY KEY,
  "schedule" timestamp NOT NULL,
  "user_id" integer NOT NULL,
  "desk_id" integer NOT NULL
);

ALTER TABLE "users" ADD FOREIGN KEY ("region_id") REFERENCES "cities" ("id");

ALTER TABLE "rooms" ADD FOREIGN KEY ("region_id") REFERENCES "cities" ("id");

ALTER TABLE "desks" ADD FOREIGN KEY ("room_id") REFERENCES "rooms" ("id");

ALTER TABLE "schedules" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "schedules" ADD FOREIGN KEY ("desk_id") REFERENCES "desks" ("id");
