import { extendObservable, action } from "mobx";
import axios from "axios";
import APIclient from "../../apiclient";
import remotedev from "mobx-remotedev/lib";

class UserStore {
  constructor() {
    extendObservable(this, {
      authenticating: false,
      authenticated: false,
      user: null,
      exercises: [],
      problem: [],

      get getCurrUser() {
        return this.user;
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

      logout: action(callback => {
        APIclient.userAuthAPI
          .delete()
          .then(() => {
            this.releaseUser();
            callback();
          })
          .catch(err => console.log(err));
      }),
    });
  }
}
export default remotedev(new UserStore(), { name: "User Store" });
