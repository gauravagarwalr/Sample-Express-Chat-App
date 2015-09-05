import React from "react";
import {Input, Button} from "react-bootstrap";

import shouldComponentUpdate from "../common/shouldupdate";

import Message from "../../stores/messages_store";

class MessageBox extends React.Component {
  constructor() {
    super();

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    var messageBody = this.refs.messageInput.getValue();
    this.refs.messageInput.getInputDOMNode().value = "";

    return Message.sendMessage(this.props.otherUser, messageBody);
  }

  render() {
    return (
      <div className="row message-box">
        <div className="message-input">
          <Input ref="messageInput" type="textarea" placeholder="Type Here..." standalone={true}/>
        </div>
        <div className="message-actions">
          <Button className="btn-success send-action" onClick={this.sendMessage}>
            Send
          </Button>
        </div>
      </div>
    );
  }
}

export default MessageBox;
