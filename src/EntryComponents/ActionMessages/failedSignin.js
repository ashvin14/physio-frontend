import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";

export default class FailedSignIn extends Component {
  handleDismiss = () => this.setState({ show: false });
  reloadPage = () => window.location.reload();

  render() {
    let { message, title } = this.props;
    if (this.props.error)
      return (
        <Alert bsStyle="danger">
          <h4>{title}</h4>
          <p>{message}</p>
          <p>
            <Button bsStyle="danger" onClick={this.reloadPage}>
              Reload this page if connection is restored
            </Button>
          </p>
        </Alert>
      );
    return null;
  }
}
