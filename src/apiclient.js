import axios from "axios";

import {
  allPatientsUrl,
  userAuthUrl,
  patientRegisterUrl,
  logoutUserUrl,
  getMaxScoreUrl,
  singlePatientUrl,
  postNotificationUrl,
  getNotificationsUrl,
} from "./Constant";

axios.defaults.withCredentials = true;

const commonHeaders = {
  headers: { "Access-Control-Allow-Origin": "http://localhost:8000" },
};

const Notifications = {
  post: (message, user_id) => {
    return axios.post(
      postNotificationUrl,
      message,
      {
        params: { user_id },
      },
      commonHeaders,
    );
  },
  getAll: patientId => {
    return axios.get(getNotificationsUrl(patientId), commonHeaders);
  },
};
const allPatientsAPI = {
  get: () => axios.get(allPatientsUrl, commonHeaders),
  getSinglePatient: patientID => axios.get(singlePatientUrl(patientID)),
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
  Notifications,
};

export default APIclient;
