import React, { Component } from "react";
import { NavItem, Glyphicon } from "react-bootstrap";
import { extendObservable, action, toJS } from "mobx";
import { Redirect } from "react-router-dom";

import { inject, observer } from "mobx-react";
import APIClient from "../../apiclient";

class LogoutHeaderItem extends Component {
  state = { logout: false };

  logoutSuccessful = () => {
    this.setState({ logout: true });
  };

  logout = ev => {
    let { userStore } = this.props;
    let { roles } = this.props.userStore.user;
    if (roles == "patient") {
      userStore.logout();
      this.logoutSuccessful();
    }
  };

  render() {
    if (this.state.logout) return <Redirect to="/" />;
    return (
      <NavItem onClick={this.logout}>
        Log Out <Glyphicon glyph="glyphicon glyphicon-off" />
      </NavItem>
    );
  }
}

export default inject("userStore")(observer(LogoutHeaderItem));
