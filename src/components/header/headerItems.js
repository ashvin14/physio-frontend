import React, { Component } from "react";
import { NavDropdown, NavItem } from "react-bootstrap";
import { HeaderMenuItem } from "./headerMenuItems";
export class HeaderItems extends Component {
  render() {
    return (
      <NavDropdown eventKey={3} title="Actions" id="basic-nav-dropdown">
        <HeaderMenuItem action={"view add"} />
        <HeaderMenuItem action={"view add"} />
        <HeaderMenuItem action={"view add"} />
      </NavDropdown>
    );
  }
}
