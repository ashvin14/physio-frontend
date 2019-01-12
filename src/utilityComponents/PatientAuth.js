import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

class PatientAuth extends Component {
  render() {
    let { userStore } = this.props;

    if (userStore.isPatient) return this.props.children;
    else {
      return <Redirect to="/login" />;
    }
  }
}

export default withRouter(inject("userStore")(observer(PatientAuth)));
