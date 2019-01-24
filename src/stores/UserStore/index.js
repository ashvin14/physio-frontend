import { extendObservable, action } from "mobx";
import axios from "axios";
import APIclient from "../../apiclient";
import remotedev from "mobx-remotedev/lib";
import UtilityMethods from "../../UtilityMethods";

class UserStore {
  constructor() {
    extendObservable(this, {
      authenticating: false,
      authenticated: false,
      user: null,
      roles: null,
      exercises: [],
      problem: [],

      get getCurrUser() {
        return this.user;
      },

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
          .catch(err => onFailure(err));
      }),

      signUp: action((data, onSuccess, onFailure) => {
        APIclient.patientRegisterAPI
          .post(data)
          .then(user => {
            onSuccess(user);
          })
          .catch(err => onFailure(err));
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

      logout: action(callback => {
        APIclient.userAuthAPI
          .delete()
          .then(() => {
            this.releaseUser();
            UtilityMethods.removeUserSession();
            callback();
          })
          .catch(err => console.log(err));
      }),
    });
  }
}
export default remotedev(new UserStore(), { name: "User Store" });
