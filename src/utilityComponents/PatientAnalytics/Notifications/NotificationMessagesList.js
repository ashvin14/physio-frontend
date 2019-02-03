import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Notification from "./Notification";
import { ListGroup } from "react-bootstrap";

class NotificationMessagesList extends Component {
  render() {
    let { notificationList } = this.props;
    let message = "";
    if (!notificationList.length) message = "no messages";

    return (
      <ListGroup>
        {message}
        {notificationList.map((notification, index) => (
          <Notification key={index} notification={notification} />
        ))}
      </ListGroup>
    );
  }
}

export default NotificationMessagesList;
