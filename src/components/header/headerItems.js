import React, { Component } from "react";
import { Dropdown, NavItem, Icon } from "react-materialize";

export class HeaderItems extends Component {
  render() {
    return (
      <Dropdown
        trigger={
          <NavItem>
            <Icon>view_module</Icon>
          </NavItem>
        }
      />
    );
  }
}
