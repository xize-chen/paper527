// import http from 'src/utils/http-common';
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getSummaryOfWorld", "getTotalCases",
   "getLocationOfCountry","getTotalCaseByMonth",] }] */
// eslint-disable-next-line consistent-return

import axios from 'axios';

const baseURL = 'http://localhost:8080';

const signup = async (account) => {
  const strAcc = JSON.stringify(account);
  const res = await axios
    .post(`${baseURL}/sign_up?account=${strAcc}`)
    .catch((err) => console.log(err));
  return res.status(200).end();
};

const signin = async (email, pass) => {
  const res = await axios
    .post(`${baseURL}/sign_in?email=${email}&password=${pass}`)
    .catch((err) => console.log(err));
  return res.data.value;
};

const saveInfo = async (account) => {
  const strAcc = JSON.stringify(account);
  const res = await axios
    .put(`${baseURL}/save_account?account=${strAcc}`)
    .catch((err) => console.log(err));
  console.log(res);
};

export default {
  signup,
  signin,
  saveInfo,
};
