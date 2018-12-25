import { extendObservable, action } from "mobx";
import axios from "axios";
import APIclient from "../../apiclient";
import remotedev from "mobx-remotedev/lib";

class ErrorStore {
  constructor() {
    extendObservable(this, {
      Error: false,
      changeStatus: action(() => {
        this.Error = true;
      }),
    });
  }
}
export default remotedev(new ErrorStore(), { name: "Error Store" });
