import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";

export default class FailedSignIn extends Component {
  state = { show: false };

  handleDismiss = () => this.setState({ show: false });
  reloadPage = () => window.location.reload();

  componentDidMount() {
    let { errors } = this.props;

    if (errors) {
      this.setState({ show: true });
    }
  }

  render() {
    let { error, message, title } = this.props;
    if (this.state.show)
      return (
        <Alert bsStyle="danger">
          <h4>{title}</h4>
          <p>{message}</p>
          <p>
            <Button bsStyle="danger" onClick={this.reloadPage}>
              Reload if the connection is not established
            </Button>
          </p>
        </Alert>
      );
    return null;
  }
}
