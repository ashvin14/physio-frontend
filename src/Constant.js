const ROOT_URL = process.env.REACT_APP_ROOT_URL;

const allPatientsUrl = `${ROOT_URL}/doctor/all/patients`;

const userAuthUrl = `${ROOT_URL}/login`;
const patientRegisterUrl = `${ROOT_URL}/signup`;
const logoutUserUrl = `${ROOT_URL}/signOut`;

export { allPatientsUrl, userAuthUrl, patientRegisterUrl, logoutUserUrl };
