import React, { Component } from "react";
import ReactQuill from "react-quill";
import { Button, ButtonToolbar } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";

class CreateNotification extends Component {
  render() {
    return (
      <div>
        <ReactQuill value={this.props.text} onChange={this.props.onChange} />
        <ButtonToolbar>
          <Button
            bsStyle={"success"}
            onClick={this.props.onSubmit}
            className="pull-right"
          >
            Send Mail
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default CreateNotification;
