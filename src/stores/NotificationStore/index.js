import { extendObservable, action } from "mobx";
import axios from "axios";
import APIclient from "../../apiclient";
import remotedev from "mobx-remotedev/lib";
import UtilityMethods from "../../UtilityMethods";
import ErrorStore from "../ErrorStore";

class NotificationStore {
  constructor() {
    extendObservable(this, {
      notifications: [],
      get allNotifications() {
        return this.notifications;
      },
      sendNotification: action((message, user_id, onSuccess) => {
        APIclient.Notifications.post({ message }, user_id)
          .then(({ data }) => {
            this.pushNotification(data);
            onSuccess(data);
          })
          .catch(err => {
            UtilityMethods.handleError(ErrorStore, err);
          });
      }),
      getAllNotifications: action(patientId => {
        APIclient.Notifications.getAll(patientId)
          .then(({ data }) => {
            this.notifications = [...data];
          })
          .catch(err => {
            UtilityMethods.handleError(ErrorStore, err);
          });
      }),
      pushNotification: action(data => this.notifications.push(data)),
    });
  }
}

export default remotedev(new NotificationStore(), {
  name: "Notification Store",
});
