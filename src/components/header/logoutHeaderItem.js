import React, { Component } from "react";
import { NavItem, Glyphicon } from "react-bootstrap";
import { extendObservable, action, toJS } from "mobx";

import { inject, observer } from "mobx-react";

class LogoutHeaderItem extends Component {
  logout = ev => {
    let { roles } = this.props.userStore.user;
    if (roles == "patient") {
      //do something
    } else {
      //do otherwise
    }
  };
  render() {
    return (
      <NavItem onClick={this.logout}>
        Log Out <Glyphicon glyph="glyphicon glyphicon-off" />
      </NavItem>
    );
  }
}

export default inject("userStore")(observer(LogoutHeaderItem));
