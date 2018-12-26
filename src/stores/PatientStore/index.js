import { extendObservable, action } from "mobx";
import axios from "axios";
import APIclient from "../../apiclient";
import remotedev from "mobx-remotedev/lib";

class PatientStore {
  constructor() {
    extendObservable(this, {
      patients: [],
      grabAllPatients: action(() => {
        APIclient.allUsersAPI
          .get()
          .then(response => {
            this.users = [...response.data];
          })
          .catch(err => console.log(err)); //handle this error wisely
      }),
    });
  }
}
export default remotedev(new PatientStore(), { name: "Patient Store" });
