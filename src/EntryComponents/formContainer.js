import React, { Component } from "react";
import {
  Panel,
  Col,
  Form,
  Row,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  ButtonToolbar,
} from "react-bootstrap";
import { FailedSignIn } from "./ActionMessages/";

export default class FormContainer extends Component {
  state = { error: { status: false, title: "", message: "" } };

  toggleErrorState = ({ title, message }) =>
    this.setState({
      error: {
        status: true,
        title,
        message,
      },
    });
  render() {
    let { children, role, type } = this.props;
    let { status, title, message } = this.state.error;
    const Children = React.Children.map(children, child =>
      React.cloneElement(child, { toggleErrorState: this.toggleErrorState }),
    );

    return (
      <Row>
        <Col {...this.props}>
          <Panel bsStyle={"info"}>
            <Panel.Heading>
              {role} {type}
            </Panel.Heading>
            <Panel.Body>
              {Children}

              <FailedSignIn error={status} title={title} message={message} />
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}
