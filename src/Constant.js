const ROOT_URL = process.env.REACT_APP_ROOT_URL;

const allPatientsUrl = `${ROOT_URL}/doctor/all/patients`;

const userAuthUrl = `${ROOT_URL}/login`;
const patientRegisterUrl = `${ROOT_URL}/signup`;
const logoutUserUrl = `${ROOT_URL}/signOut`;
const getMaxScoreUrl = `${ROOT_URL}/doctor/patient/maxscore`;
const singlePatientUrl = patientID => `${ROOT_URL}/doctor/${patientID}`;
const postNotificationUrl = `${ROOT_URL}/doctor/sendmail`;
const getNotificationsUrl = patientID =>
  `${ROOT_URL}/doctor/getmail/${patientID}`;

export {
  allPatientsUrl,
  userAuthUrl,
  patientRegisterUrl,
  logoutUserUrl,
  getMaxScoreUrl,
  singlePatientUrl,
  postNotificationUrl,
  getNotificationsUrl,
};
