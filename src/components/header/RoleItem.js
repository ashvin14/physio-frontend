import React, { Component } from "react";
import { NavItem, Glyphicon } from "react-bootstrap";

export class RoleItem extends Component {
  isDoctor = () => this.props.path === "doctor/login";
  isPatient = () => this.props.path === "/";
  render() {
    let { role, history } = this.props;
    console.log(history);

    if (role === "doctor") {
      return (
        <NavItem className={this.isDoctor() ? "active" : null}>
          Doctor Login <Glyphicon glyph="glyphicon glyphicon-plus" />
        </NavItem>
      );
    } else {
      return (
        <NavItem className={this.isPatient() ? "active" : null}>
          Patient Login <Glyphicon glyph="glyphicon glyphicon-user" />
        </NavItem>
      );
    }
  }
}
