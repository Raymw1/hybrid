const express = require("express");
const server = express();
const routes = require("./routes/index");

server.use(routes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log(`Server running in http://127.0.0.1:${PORT}`);
});
