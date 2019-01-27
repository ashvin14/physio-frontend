import axios from "axios";

import {
  allPatientsUrl,
  userAuthUrl,
  patientRegisterUrl,
  logoutUserUrl,
  getMaxScoreUrl,
} from "./Constant";

axios.defaults.withCredentials = true;

const allPatientsAPI = {
  get: () => axios.get(allPatientsUrl, commonHeaders),
};

const commonHeaders = {
  headers: { "Access-Control-Allow-Origin": "http://localhost:8000" },
};
const userAuthAPI = {
  post: data => axios.post(userAuthUrl, data, commonHeaders),
  delete: () => axios.delete(logoutUserUrl, commonHeaders),
};

const currentPatientMaxScoreDayWise = {
  get: (patientID, joint) =>
    axios.get(
      getMaxScoreUrl,
      {
        params: { patientID, joint },
      },
      commonHeaders,
    ),
};

const patientRegisterAPI = {
  post: data => axios.post(patientRegisterUrl, data, commonHeaders),
};

const APIclient = {
  allPatientsAPI,
  patientRegisterAPI,
  userAuthAPI,
  currentPatientMaxScoreDayWise,
};

export default APIclient;
