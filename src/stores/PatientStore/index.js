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
      deleteCurrentPatient: action(id => {
        //api call to delete patient
        this.patients.map((patient, index) => {
          if (patient.user_id === id) {
            this.patients.splice(index, 1);
          }
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
      setCurrentPatient: action(patientId => {
        APIclient.allPatientsAPI
          .getSinglePatient(patientId)
          .then(response => {
            let patient = response.data;
            this.currentPatient = patient;
          })
          .catch(err => {
            UtilityMethods.handleError(ErrorStore, err);
          });

        //this.currentPatient=patient
      }),
      pushPatient: action(data => this.patients.push(data)),
    });
  }
}
export default remotedev(new PatientStore(), { name: "Patient Store" });
