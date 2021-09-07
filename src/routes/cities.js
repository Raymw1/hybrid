const express = require("express");
const CityController = require("../app/controllers/CityController");
const cityValidator = require("../app/validators/cityValidator");
const routes = express.Router();
const { onlyUsers } = require("../app/middlewares/session");

/* CITIES */
routes.get("/cities", onlyUsers, CityController.getCities);
routes.post(
  "/cities",
  onlyUsers,
  cityValidator.changeCity,
  CityController.changeCity
);

module.exports = routes;
