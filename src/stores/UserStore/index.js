import { extendObservable, action } from "mobx";
import axios from "axios";
import APIclient from "../../apiclient";
import remotedev from "mobx-remotedev/lib";
import UtilityMethods from "../../UtilityMethods";
import ErrorStore from "../ErrorStore";
import PatientStore from "../PatientStore";

class UserStore {
  constructor() {
    extendObservable(this, {
      authenticating: false,
      authenticated: false,
      user: null,
      roles: null,
      edited: false,
      editedUserId: null,
      exercises: [],
      problem: [],
      setEditUserId(value) {
        this.editedUserId = value;
      },
      get getCurrUser() {
        return this.user;
      },
      toggleEdited: action(value => {
        this.edited = value;
      }),
      editCurrentPatient: action((id, editedData, callback, onFailure) => {
        APIclient.patientRegisterAPI
          .put(id, editedData)
          .then(({ data }) => {
            PatientStore.patients.map((patient, index) => {
              if (patient.user_id === id) {
                PatientStore.patients[index] = data;
                this.setEditUserId(null);
                callback(data);
              }
            });
          })
          .catch(err => {
            onFailure(err);
            UtilityMethods.handleError(ErrorStore, err);
          });
      }),
      deleteCurrentPatient: action(id => {
        APIclient.patientRegisterAPI
          .delete(id)
          .then(response => {
            PatientStore.patients.map((patient, index) => {
              if (patient.user_id === id) {
                PatientStore.patients.splice(index, 1);
              }
            });
          })
          .catch(err => {
            UtilityMethods.handleError(ErrorStore, err);
          }); //api call to delete patient
      }),

      get isDoctor() {
        return UtilityMethods.getUserSession().user.roles === "doctor";
      },
      get isPatient() {
        return UtilityMethods.getUserSession().user.roles === "patient";
      },

      toggleAuthenting: action(value => {
        this.authenticating = value;
      }),

      toggleAuthentication: action(value => {
        this.authenticated = value;
      }),

      authenticate: action((data, onSuccess, onFailure) => {
        this.toggleAuthenting(true);

        APIclient.userAuthAPI
          .post(data)
          .then(response => {
            this.toggleAuthentication(true);
            this.toggleAuthenting(false);
            this.user = response.data;
            this.roles = response.data.roles;

            onSuccess(response);
          })
          .catch(err => {
            onFailure(err);
            UtilityMethods.handleError(ErrorStore, err);
          });
      }),

      signUp: action((data, onSuccess, onFailure) => {
        APIclient.patientRegisterAPI
          .post(data)
          .then(user => {
            onSuccess(user);
          })
          .catch(err => {
            onFailure(err);
            UtilityMethods.handleError(ErrorStore, err);
          });
      }),

      releaseUser: action(() => {
        this.user = null;
        this.toggleAuthentication(false);
        this.problem = [];
        this.exercises = [];
      }),

      setUser: action(user => {
        this.user = user;
        this.toggleAuthentication(true);
        this.toggleAuthenting(false);
        this.roles = user.roles;
      }),

      logout: action(() => {
        APIclient.userAuthAPI
          .delete()
          .then(() => {
            this.releaseUser();
            UtilityMethods.removeUserSession();
          })
          .catch(err => {
            UtilityMethods.handleError(ErrorStore, err);
          });
      }),
    });
  }
}
export default remotedev(new UserStore(), { name: "User Store" });
