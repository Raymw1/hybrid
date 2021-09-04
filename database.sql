DROP TABLE IF EXISTS "schedules";
DROP TABLE IF EXISTS "desks";
DROP TABLE IF EXISTS "rooms";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "cities";
DROP TABLE IF EXISTS "session";

CREATE TABLE "cities" (
  "id" SERIAL PRIMARY KEY,
  "city" VARCHAR(100) NOT NULL
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "phone" VARCHAR(100) UNIQUE NOT NULL,
  "password" text NOT NULL,
  "city_id" integer NOT NULL DEFAULT 0,
  "reset_token" text,
  "reset_token_expires" text,
  "is_admin" boolean NOT NULL DEFAULT false
);

CREATE TABLE "rooms" (
  "id" integer PRIMARY KEY,
  "city_id" integer NOT NULL,
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

------------- SESSION ID -------------
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" 
ADD CONSTRAINT "session_pkey" 
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

------------- FOREIGN KEYS -------------
ALTER TABLE "users" ADD FOREIGN KEY ("city_id") REFERENCES "cities" ("id");
ALTER TABLE "rooms" ADD FOREIGN KEY ("city_id") REFERENCES "cities" ("id");
ALTER TABLE "desks" ADD FOREIGN KEY ("room_id") REFERENCES "rooms" ("id");
ALTER TABLE "schedules" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "schedules" ADD FOREIGN KEY ("desk_id") REFERENCES "desks" ("id");

------------- CASCADE EFFECT ON DELETE -------------
ALTER TABLE "desks" DROP CONSTRAINT schedules_room_id_fkey, 
ADD CONSTRAINT schedules_room_id_fkey FOREIGN KEY ("room_id") REFERENCES "rooms" ("id")
ON DELETE CASCADE;

ALTER TABLE "schedules" DROP CONSTRAINT schedules_user_id_fkey, 
ADD CONSTRAINT schedules_user_id_fkey FOREIGN KEY ("user_id") REFERENCES "users" ("id")
ON DELETE CASCADE;

ALTER TABLE "schedules" DROP CONSTRAINT schedules_desk_id_fkey, 
ADD CONSTRAINT schedules_desk_id_fkey FOREIGN KEY ("desk_id") REFERENCES "desks" ("id")
ON DELETE CASCADE;
