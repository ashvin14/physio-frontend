const ROOT_URL = process.env.REACT_APP_ROOT_URL;

const allPatientsUrl = `${ROOT_URL}`;

const patientAuthUrl = `${ROOT_URL}/patient/login`;
const patientRegisterUrl = `${ROOT_URL}/patient/signup`;

export { allPatientsUrl, patientAuthUrl, patientRegisterUrl };
