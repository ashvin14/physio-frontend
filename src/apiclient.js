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
  deletePatientUrl,
  editPatientUrl,
  getMinMaxRomUrl,
} from "./Constant";

axios.defaults.withCredentials = true;

const commonHeaders = {
    headers: { "Access-Control-Allow-Origin": process.env.REACT_ROOT_APP_URL },
  },
  Notifications = {
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
  },
  allPatientsAPI = {
    get: () => axios.get(allPatientsUrl, commonHeaders),
    getSinglePatient: patientID => axios.get(singlePatientUrl(patientID)),
  },
  userAuthAPI = {
    post: data => axios.post(userAuthUrl, data, commonHeaders),
    delete: () => axios.delete(logoutUserUrl, commonHeaders),
  },
  currentPatientMaxScoreDayWise = {
    get: (patientID, joint) =>
      axios.get(
        getMaxScoreUrl,

        {
          params: { patientID, joint },
        },
        commonHeaders,
      ),
  },
  currentPatientMinMaxRom = {
    get: (patientID, joint) =>
      axios.get(
        getMinMaxRomUrl(patientID),
        {
          params: { joint },
        },
        commonHeaders,
      ),
  },
  patientRegisterAPI = {
    post: data => axios.post(patientRegisterUrl, data, commonHeaders),
    put: (patientId, data) =>
      axios.put(editPatientUrl(patientId), data, commonHeaders),
    delete: patientId =>
      axios.delete(deletePatientUrl(patientId), commonHeaders),
  },
  APIclient = {
    allPatientsAPI,
    patientRegisterAPI,
    userAuthAPI,
    currentPatientMaxScoreDayWise,
    currentPatientMinMaxRom,
    Notifications,
  };

export default APIclient;
