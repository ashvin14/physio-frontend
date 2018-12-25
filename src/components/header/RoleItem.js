import React, { Component } from "react";
import { NavItem, Glyphicon } from "react-bootstrap";

export class RoleItem extends Component {
  render() {
    let { role } = this.props;
    if (role === "doctor") {
      return (
        <NavItem>
          Doctor Login <Glyphicon glyph="glyphicon glyphicon-plus" />
        </NavItem>
      );
    } else {
      return (
        <NavItem>
          Patient Login <Glyphicon glyph="glyphicon glyphicon-user" />
        </NavItem>
      );
    }
  }
}
