import React from "react";
import {Input, Button} from "react-bootstrap";

import shouldComponentUpdate from "../common/shouldupdate";

import Message from "../../stores/messages_store";

class MessageBox extends React.Component {
  constructor() {
    super();

    this.state = {
      sending: false
    };

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    this.sendMessage = this.sendMessage.bind(this);
    this.handleTextArea = this.handleTextArea.bind(this);
  }

  handleTextArea(jsEvent) {
    if(jsEvent.keyCode === 13) {
      if (!jsEvent.shiftKey){
        this.sendMessage();
      }
    };
  }

  sendMessage() {
    this.setState({sending: true});
    var messageBody = this.refs.messageInput.getValue();

    return Message.sendMessage(this.props.user, messageBody).then(() => {
      this.refs.messageInput.getInputDOMNode().value = "";
      this.setState({sending: false});
      this.refs.messageInput.getInputDOMNode().focus();
    });
  }

  render() {
    var buttonOptions = {
      text: "Sending..",
      props: {
        className: "send-action",
        bsStyle: "info",
        disabled: true
      }
    };

    if(!this.state.sending) {
      buttonOptions.text = "Send";
      buttonOptions.props.disabled = false;
      buttonOptions.props.bsStyle = "success";
      buttonOptions.props.onClick = this.sendMessage;
    }

    return (
      <div className="row message-box">
        <div className="message-input">
          <Input
            ref="messageInput"
            type="textarea"
            placeholder="Type Here..."
            disabled={this.state.sending}
            standalone={true}
            onKeyDown={this.handleTextArea}/>
        </div>
        <div className="message-actions">
          <Button {...buttonOptions.props}>
            {buttonOptions.text}
          </Button>
        </div>
      </div>
    );
  }
}

export default MessageBox;
