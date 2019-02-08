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

      currentPatient: null,
      grabAllPatients: action(() => {
        APIclient.allPatientsAPI
          .get()
          .then(response => {
            this.patients = [...response.data];
          })
          .catch(err => {
            UtilityMethods.handleError(ErrorStore, err);
          });
      }),

      get allPatients() {
        return this.patients;
      },
      get getCurrentPatient() {
        return this.currentPatient;
      },
      currentPatientMinMaxRom: action((patientId, joint, onSuccess) => {
        APIclient.currentPatientMinMaxRom
          .get(patientId, joint)
          .then(({ data }) => {
            let MinMaxRom = data;
            this.currentPatient = { ...this.currentPatient, MinMaxRom };
            onSuccess(data);
          })
          .catch(err => {
            UtilityMethods.handleError(ErrorStore, err);
          });
      }),
      currentPatientMaxScoreDayWise: action((patientId, joint, onSuccess) => {
        APIclient.currentPatientMaxScoreDayWise
          .get(patientId, joint)
          .then(response => {
            let maxScoreData = response.data;
            this.currentPatient = { ...this.currentPatient, maxScoreData };
            onSuccess(maxScoreData);
          })
          .catch(err => {
            UtilityMethods.handleError(ErrorStore, err);
          });
      }),
      setCurrentPatient: action((patientId, callback) => {
        APIclient.allPatientsAPI
          .getSinglePatient(patientId)
          .then(({ data }) => {
            this.currentPatient = data;
            callback(data);
          })
          .catch(err => {
            UtilityMethods.handleError(ErrorStore, err);
          });

        //this.currentPatient = { name: "ashvin", age: "20", user_id: 12 };
      }),
      pushPatient: action(data => this.patients.push(data)),
    });
  }
}
export default remotedev(new PatientStore(), { name: "Patient Store" });
