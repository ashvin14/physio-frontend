import React, { Component } from "react";
import { NavItem, Glyphicon } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export class RoleItem extends Component {
  state = { redirectPatient: false, redirectDoctor: false };
  isDoctor = () => this.props.path === "/doctor/login";
  isPatient = () => this.props.path === "/patient/login";

  render() {
    let { role, history } = this.props;

    if (this.state.redirectDoctor) return <Redirect to="/doctor/login" />;

    if (role === "doctor") {
      return (
        <NavItem className={this.isDoctor() ? "active" : null}>
          Doctor Login <Glyphicon glyph="glyphicon glyphicon-plus" />
        </NavItem>
      );
    } else {
      return (
        <NavItem
          className={this.isPatient() ? "active" : null}
          onClick={() => this.setState({ redirect: true })}
        >
          Patient Login <Glyphicon glyph="glyphicon glyphicon-user" />
        </NavItem>
      );
    }
  }
}
