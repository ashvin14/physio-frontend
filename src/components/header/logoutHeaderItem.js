import React, { Component } from "react";
import { Dropdown, Icon, NavItem } from "react-materialize";

export class LogoutHeaderItem extends Component {
  render() {
    return (
      <NavItem>
        <Icon>power_settings_new</Icon>
      </NavItem>
    );
  }
}
