// import http from 'src/utils/http-common';
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getSummaryOfWorld", "getTotalCases",
   "getLocationOfCountry","getTotalCaseByMonth",] }] */
// eslint-disable-next-line consistent-return

import axios from 'axios';
import sessionKey from '../constants/sessionKey';

const env = process.env.NODE_ENV;
let baseURL;

if (env === 'development') {
  baseURL = 'http://localhost:8080';
} else if (env === 'production') {
  baseURL = '/api';
}

const getSummaryOfWorld = async () => {
  const res = await axios
    .get(`${baseURL}/get_summary_world`)
    .catch((err) => console.log(err));

  return res.data.value.Items;
};

const getTopTenCases = async () => {
  const res = await axios
    .get(`${baseURL}/get-top-10-by-death-case`)
    .catch((err) => console.log(err));

  return res.data.value.Items;
};

const getTopTenTests = async () => {
  const res = await axios
    .get(`${baseURL}/get-top-10-by-tests`)
    .catch((err) => console.log(err));

  return res.data.value.Items;
};

const getSummaryByLocation = async (iso) => {
  const res = await axios
    .get(`${baseURL}/get_total_cases_by_iso?iso=${iso}`)
    .catch((err) => console.log(err));
  return res.data.value.Items;
};

const getPastYearDataByLocation = async (location) => {
  const res = await axios
    .get(`${baseURL}/get_past_12_month_by_iso?iso=${location}`)
    .catch((err) => console.log(err));

  return res.data.value.Items;
};

const signUp = async (account) => {
  const strAcc = JSON.stringify(account);
  axios
    .post(`${baseURL}/sign_up?account=${strAcc}`)
    .catch((err) => console.log(err));
};

const signIn = async (email, pass) => {
  const res = await axios
    .post(`${baseURL}/sign_in?email=${email}&password=${pass}`)
    .catch((err) => console.log(err));
  return res.data.value;
};

const getAccount = async (email) => {
  const res = await axios
    .get(`${baseURL}/query_by_email?email=${email}`)
    .catch((err) => console.log(err));
  console.log(`res.data.value: ${JSON.stringify(res.data.value)}`);
  const result = res.data.value.Items.length > 0 ? res.data.value.Items[0] : {};
  if (res.data.value.Items.length > 0) {
    result.selectedCountry = result.country;
  }
  window.sessionStorage.setItem(sessionKey.ACCOUNT_KEY, JSON.stringify(result));
  return result;
};

const saveInfo = async (account) => {
  const strAcc = JSON.stringify(account);
  const res = await axios
    .put(`${baseURL}/save_account?account=${strAcc}`)
    .catch((err) => console.log(err));
  console.log(res);
  return res;
};

const getCountries = async () => {
  const res = await axios
    .get(`${baseURL}/get_location_country`)
    .catch((err) => console.log(err));
  // console.log(`getCountries: ${JSON.stringify(res.data.value)}`);
  const result = res.data.value.Items.length > 0 ? res.data.value.Items : {};
  return result;
};

export default {
  getSummaryOfWorld,
  getTopTenCases,
  getTopTenTests,
  getSummaryByLocation,
  getPastYearDataByLocation,
  signUp,
  signIn,
  saveInfo,
  getAccount,
  getCountries
};
