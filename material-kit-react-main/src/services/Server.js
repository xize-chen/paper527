import http from 'src/utils/http-common';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getSummaryOfWorld", "getTotalCases",
   "getLocationOfCountry","getTotalCaseByMonth",] }] */

class Server {
  getSummaryOfWorld(date, callback) {
    return http.get('/get_summary_world?date='.concat(date)).then((response) => {
      if (response.status !== 200) {
        console.log(response.data.message);
      }
      callback(response);
    });
  }

  getTotalCases(date, callback) {
    return http.get('/get_total_case?date='.concat(date)).then((response) => {
      if (response.status !== 200) {
        console.log(response.data.message);
      }
      callback(response);
    });
  }

  getLocationOfCountry(callback) {
    return http.get('/get_location_country').then((response) => {
      if (response.status !== 200) {
        console.log(response.data.message);
      }
      callback(response);
    });
  }

  getTotalCaseByMonth(callback) {
    return http.get('/get_total_case_by_month').then((response) => {
      if (response.status !== 200) {
        console.log(response.data.message);
      }
      callback(response);
    });
  }
}

export default Server;
