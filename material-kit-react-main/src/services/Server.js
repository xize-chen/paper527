// import http from 'src/utils/http-common';
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getSummaryOfWorld", "getTotalCases",
   "getLocationOfCountry","getTotalCaseByMonth",] }] */
// eslint-disable-next-line consistent-return

import axios from 'axios';

const baseURL = 'http://localhost:8080';

const getSummaryOfWorld = async (date) => {
  const res = await axios
    .get(`${baseURL}/get_summary_world?date=${date}`)
    .catch((err) => console.log(err));

  return res.data.value.Items;
};

// const getTotalCasesEachCountry = async (date) => {
//   const res = await axios
//     .get('/get_total_case?date='.concat(date))
//     .catch((err) => console.log(err));

//   return res.data.value.Items;
// };

const getTopTenCases = async () => {
  const res = await axios
    .get(`${baseURL}/get-top-10-by-case`)
    .catch((err) => console.log(err));

  return res.data.value.Items;
};

const getTopTenDeaths = async () => {
  const res = await axios
    .get(`${baseURL}/get-top-10-by-death`)
    .catch((err) => console.log(err));

  return res.data.value.Items;
};

// getLocationOfCountry(callback) {
//   return http.get('/get_location_country').then((response) => {
//     if (response.status !== 200) {
//       console.log(response.data.message);
//     }
//     callback((res) => res.data);
//   });
// }

// getTotalCaseByMonth(callback) {
//   return http.get('/get_total_case_by_month').then((response) => {
//     if (response.status !== 200) {
//       console.log(response.data.message);
//     }
//     callback((res) => res.data);
//   });
// }

export default {
  getSummaryOfWorld,
  getTopTenCases,
  getTopTenDeaths
  // getLocationOfCountry,
  // getTotalCaseByMonth
};
