import axios from "axios";

import { allPatientsUrl, patientAuthUrl, patientRegisterUrl } from "./Constant";

axios.defaults.withCredentials = false;

const allUsersAPI = {
  get: () =>
    axios.get(allPatientsUrl, {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8000" },
    }),
};

const patientAuthAPI = {
  post: data =>
    axios.post(patientAuthUrl, data, {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8000" },
    }),
};

const patientRegisterAPI = {
  post: data =>
    axios.post(patientRegisterUrl, data, {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8000" },
    }),
};

const APIclient = { allUsersAPI, patientAuthAPI, patientRegisterAPI };

export default APIclient;
