import React, { Component } from "react";
import { NavItem, Icon } from "react-materialize";

export class RoleItem extends Component {
  render() {
    let { role } = this.props;
    if (role == "doctor") {
      return (
        <NavItem>
          Doctor Login
          <Icon>add_alert</Icon>
        </NavItem>
      );
    } else {
      return (
        <NavItem>
          Patient Login
          <Icon>accessibility</Icon>
        </NavItem>
      );
    }
  }
}
