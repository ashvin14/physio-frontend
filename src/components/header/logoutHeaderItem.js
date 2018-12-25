import React, { Component } from "react";
import { NavItem, Glyphicon } from "react-bootstrap";

export class LogoutHeaderItem extends Component {
  render() {
    return (
      <NavItem>
        Log Out <Glyphicon glyph="glyphicon glyphicon-off" />
      </NavItem>
    );
  }
}
