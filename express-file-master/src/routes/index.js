const express = require('express');
const router = express.Router();
const controller = require('../controller/file.controller');

let routes = (app) => {
  router.get('/get_summary_world', controller.getSummaryOfWorld);
  router.get('/get_total_case', controller.getTotalCases);
  router.get('/get_location_country', controller.getLocationOfCountry);

  router.get('/get_past_12_month_by_iso', controller.getTotalCaseByMonth);
  
  router.get('/get-top-10-by-case', controller.getTopTenByCase);
  router.get('/get-top-10-by-death', controller.getTopTenByDeath);
  router.post('/sign_up', controller.signUp);
  router.post('/sign_in', controller.signInWithEmailAndPassword);
  router.post('/update_password', controller.updatePassword);
  router.post('/save_account', controller.saveAccount);
  router.post('/query_by_email', controller.queryByEmail);

  router.get('/get_total_cases_by_iso',controller.getTotalCasesByIso);
  app.use(router);
};

module.exports = routes;
