import React, { Component } from "react";
import { NavItem, Glyphicon } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export class RoleItem extends Component {
  state = { redirectPatient: false, redirectDoctor: false };
  isLoginPath = () => this.props.path === "/login";

  render() {
    let { history } = this.props;

    return (
      <NavItem className={this.isLoginPath() ? "active" : null}>
        Login <Glyphicon glyph="glyphicon glyphicon-plus" />
      </NavItem>
    );
  }
}
