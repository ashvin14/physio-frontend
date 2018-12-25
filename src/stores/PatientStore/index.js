import { extendObservable, action } from "mobx";
import axios from "axios";
import APIclient from "../../apiclient";
import remotedev from "mobx-remotedev/lib";

class PatientStore {
  constructor() {
    extendObservable(this, {
      users: [],
      grabAllPatients: action(() => {
        APIclient.allUsersAPI
          .get()
          .then(response => {
            console.log(response);
            console.log(this.users);
            this.users = [...response.data];
          })
          .catch(err => console.log(err.message));
      }),
      get allPatients() {
        return this.users;
      },
    });
  }
}
export default remotedev(new PatientStore(), { name: "Patient Store" });
