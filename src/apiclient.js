import axios from "axios";

import { allPatientsUrl } from "./Constant";

axios.defaults.withCredentials = false;

const allUsersAPI = {
  get: () =>
    axios.get(allPatientsUrl, {
      headers: { "Access-Control-Allow-Origin": "http://localhost:8000" },
    }),
};

const APIclient = { allUsersAPI };

export default APIclient;
