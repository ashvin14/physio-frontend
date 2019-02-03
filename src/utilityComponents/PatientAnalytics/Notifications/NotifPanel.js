import React, { Component } from "react";
import NotificationMessagesList from "./NotificationMessagesList";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import CreateNotification from "./createNotification";

class NotificationPanel extends Component {
  state = { text: "", loading: false };
  componentDidMount() {
    let { patientStore, notificationStore } = this.props;
    let { patientId } = this.props.match.params;
    notificationStore.getAllNotifications(patientId);
  }

  handleChange = text => this.setState({ text });

  onSuccessNotification = text => {
    this.setState({ loading: false });
    this.props.notificationStore.pushNotification(text);
  };
  onSubmit = ev => {
    let { notificationStore, patientStore } = this.props;
    let { getCurrentPatient } = patientStore;
    if (this.state.text.length) {
      notificationStore.sendNotification(
        this.state.text,
        getCurrentPatient.user_id,
        data => this.onSuccessNotification(data),
      );

      this.setState({ text: "", loading: true });
    }
  };
  render() {
    let { notifications } = this.props.notificationStore;
    return (
      <div
        className="container-fluid"
        style={{ overflowY: "scroll", height: "450px" }}
      >
        <h4>Messages Sent</h4>
        {this.state.loading ? (
          "loading ..."
        ) : (
          <NotificationMessagesList notificationList={notifications} />
        )}
        <CreateNotification
          onChange={this.handleChange}
          text={this.state.text}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default withRouter(
  inject("notificationStore", "patientStore")(observer(NotificationPanel)),
);
