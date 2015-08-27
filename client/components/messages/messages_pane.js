import React from "react";

import shouldComponentUpdate from "../common/shouldupdate";

import User from "../../stores/users_store";
import Message from "../../stores/messages_store";

class MessagesPane extends React.Component {
  constructor() {
    super();

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  renderMessages() {
    var user = this.props.user;
    var otherUser = this.props.otherUser;

    var messages = Message.getMessages(otherUser);

    if(!messages || messages.isEmpty()) {
      return (
        <span>No messages to show</span>
      );
    } else {
      return false;
    }
  }

  render() {
    var otherUser = this.props.otherUser;

    if(!otherUser || otherUser.isEmpty()) {
      return (
        <div className="row message-list">
          Select a user from the right pane to begin messaging.
        </div>
      );
    } else {
      return (
        <div className="row message-list">
          {this.renderMessages()}
        </div>
      );
    }
  }
}

export default MessagesPane;
