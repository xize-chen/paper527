const express = require('express');
const router = express.Router();
const controller = require('../controller/file.controller');
const userControl = require('../controller/userControl')

let routes = (app) => {
  router.get('/get_summary_world', controller.getSummaryOfWorld);
  // router.get('/get_total_case', controller.getTotalCases);
  router.get('/get_location_country', controller.getLocationOfCountry);
  router.get('/get_past_12_month_by_iso', controller.getTotalCaseByMonth);
  router.get('/get-top-10-by-death-case', controller.getTopTenByCase);
  router.get('/get-top-10-by-tests', controller.getTopTenByTests);
  router.get('/get_total_cases_by_iso',controller.getTotalCasesByIso);

  // router.get('/user/:id')
  router.post('/sign_up', userControl.signUp);
  router.post('/sign_in', userControl.signInWithEmailAndPassword);
  router.post('/update_password', userControl.updatePassword);
  router.put('/save_account', userControl.saveAccount);
  router.get('/query_by_email', userControl.queryByEmail);

  app.use(router);
};

module.exports = routes;
