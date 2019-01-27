import { extendObservable, action } from "mobx";
import axios from "axios";
import APIclient from "../../apiclient";
import remotedev from "mobx-remotedev/lib";
import ErrorStore from "../ErrorStore";
import UtilityMethods from "../../UtilityMethods";

class PatientStore {
  constructor() {
    extendObservable(this, {
      patients: [],
      grabAllPatients: action(() => {
        APIclient.allPatientsAPI
          .get()
          .then(response => {
            this.patients = [...response.data];
          })
          .catch(err => {
            UtilityMethods.handleError(ErrorStore, err);
          }); //handle this error wisely
      }),
      get allPatients() {
        return this.patients;
      },
      pushPatient: action(data => this.patients.push(data)),
    });
  }
}
export default remotedev(new PatientStore(), { name: "Patient Store" });
