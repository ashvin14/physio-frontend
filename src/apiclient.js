import axios from "axios";

import {
  allPatientsUrl,
  userAuthUrl,
  patientRegisterUrl,
  logoutUserUrl,
} from "./Constant";

axios.defaults.withCredentials = false;

const allPatientsAPI = {
  get: () =>
    axios.get(allPatientsUrl, {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8000" },
    }),
};

const userAuthAPI = {
  post: data =>
    axios.post(userAuthUrl, data, {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8000" },
    }),
  delete: () =>
    axios.delete(logoutUserUrl, {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8000" },
    }),
};

const patientRegisterAPI = {
  post: data =>
    axios.post(patientRegisterUrl, data, {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8000" },
    }),
};

const APIclient = {
  allPatientsAPI,
  patientRegisterAPI,
  userAuthAPI,
};

export default APIclient;
