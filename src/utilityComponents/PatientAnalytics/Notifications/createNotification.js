import React, { Component } from "react";
import ReactQuill from "react-quill";
import { Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";

class CreateNotification extends Component {
  render() {
    return (
      <div>
        <ReactQuill value={this.props.text} onChange={this.props.onChange} />
        <ButtonToolbar>
          <ButtonGroup className="mr-2">
            <Button
              onClick={this.props.generateHTMLlink}
              size="sm"
              className="pull-right"
            >
              Generate Feedback Link
            </Button>

            <Button
              onClick={this.props.generateReport}
              className="pull-right"
              size="sm"
            >
              Generate Report and send mail
            </Button>
          </ButtonGroup>
          <ButtonGroup className="pull-right ">
            <Button bsStyle={"success"} onClick={this.props.onSubmit} size="sm">
              Send Mail
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
}

export default CreateNotification;
