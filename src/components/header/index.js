import React, { Component } from "react";
import { Navbar, NavItem, Icon, Dropdown } from "react-materialize";
import { HeaderItems } from "./headerItems";
import { LogoutHeaderItem } from "./logoutHeaderItem";
import { RoleItem } from "./RoleItem";

export default class Header extends Component {
  state = {};

  render() {
    return (
      <Navbar right>
        <RoleItem role="doctor" />
        <RoleItem role="patient" />
        <HeaderItems />
        <LogoutHeaderItem />
      </Navbar>
    );
  }
}
