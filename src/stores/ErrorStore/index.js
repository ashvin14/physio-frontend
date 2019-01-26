import { extendObservable, action } from "mobx";
import axios from "axios";
import APIclient from "../../apiclient";
import remotedev from "mobx-remotedev/lib";

class ErrorStore {
  constructor() {
    extendObservable(this, {
      isError: false,
      Error: null,
      ErrorMessage: action(message => {
        this.Error = message;
      }),
      get ErrorMessage() {
        return this.Error;
      },
      get ErrorStatus() {
        return this.isError;
      },
      setError: action(value => {
        this.Error = value;
        this.changeStatus(true);
      }),
      clearError: action(() => {
        this.Error = null;
        this.changeStatus(false);
      }),
      changeStatus: action(value => {
        this.isError = !this.isError;
      }),
    });
  }
}
export default remotedev(new ErrorStore(), { name: "Error Store" });
