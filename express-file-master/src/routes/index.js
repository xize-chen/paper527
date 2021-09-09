const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  router.get("/get_summary_world", controller.getSummaryOfWorld);
  router.get("/get_total_case", controller.getTotalCases);
  router.get("/get_location_country", controller.getLocationOfCountry);
  router.get("/get_total_case_by_month", controller.getTotalCaseByMonth);
  app.use(router);
};

module.exports = routes;
