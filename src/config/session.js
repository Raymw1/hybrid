const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("./database");

module.exports = session({
  // eslint-disable-next-line new-cap
  store: new pgSession({
    pool: db,
  }),
  name: "sid",
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
});
