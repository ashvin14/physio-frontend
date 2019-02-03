import React, { Component } from "react";
import Parser from "html-react-parser";
import { ListGroup } from "react-bootstrap";

export default class Notification extends Component {
  render() {
    let { notification } = this.props;
    let date = new Date(notification.date);
    let currDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    let currTime = date.getHours() + ":" + date.getMinutes();

    return (
      <li className="list-group-item text-left">
        {Parser(notification.message)}
        <p className="text-right">
          <small>
            {currDate} {currTime}
          </small>
        </p>
      </li>
    );
  }
}
