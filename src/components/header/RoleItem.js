import React, { Component } from "react";
import { NavItem, Glyphicon } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export class RoleItem extends Component {
  state = { redirectLogin: false };
  isLoginPath = () => this.props.path === "/login";

  redirectToLogin = () => this.setState({ redirectPatient: true });

  render() {
    if (this.state.redirectPatient) return <Redirect to="/login" />;
    return (
      <NavItem
        className={this.isLoginPath() ? "active" : null}
        onClick={this.redirectToLogin}
      >
        Login <Glyphicon glyph="glyphicon glyphicon-plus" />
      </NavItem>
    );
  }
}
