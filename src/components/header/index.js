import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { HeaderItems } from "./headerItems";
import { LogoutHeaderItem } from "./logoutHeaderItem";
import { RoleItem } from "./RoleItem";

export default class Header extends Component {
  state = {};

  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Collapse>
          <Nav pullRight>
            <RoleItem role="doctor" />
            <RoleItem role="patient" />
            <HeaderItems />
            <LogoutHeaderItem />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
