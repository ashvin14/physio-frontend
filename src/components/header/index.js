import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { HeaderItems } from "./headerItems";
import LogoutHeaderItem from "./logoutHeaderItem";
import { RoleItem } from "./RoleItem";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";

class Header extends Component {
  state = {};

  render() {
    let { userStore } = this.props;

    return (
      <Navbar collapseOnSelect>
        <Navbar.Collapse>
          {userStore.authenticated ? (
            <Nav pullRight>
              <HeaderItems /> <LogoutHeaderItem />
            </Nav>
          ) : (
            <Nav pullRight>
              <RoleItem path={this.props.location.pathname} />
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(inject("userStore")(observer(Header)));
