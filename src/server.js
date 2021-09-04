const express = require("express");
const server = express();
const routes = require("./routes/index");
const nunjucks = require("nunjucks");
const methodOverride = require("method-override");
const path = require("path");
const session = require("./config/session");

server.use(session);
server.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(methodOverride("_method"));
server.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "app/views"), {
  express: server,
  autoescape: false,
  noCache: true,
});
server.use(routes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log(`Server running in http://127.0.0.1:${PORT}`);
});
