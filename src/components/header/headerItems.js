import React, { Component } from "react";
import { NavDropdown, NavItem } from "react-bootstrap";
import { HeaderMenuItem } from "./headerMenuItems";
import { SignUpComponent } from "../../EntryComponents/";
export class HeaderItems extends Component {
  render() {
    return (
      <NavDropdown eventKey={1} title="Actions" id="basic-nav-dropdown">
        <HeaderMenuItem
          eventKey={1.1}
          action={"Add patient"}
          onComponentClick={this.props.showSignUpComponent}
        />
      </NavDropdown>
    );
  }
}
