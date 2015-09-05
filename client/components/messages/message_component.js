import React from "react";

import shouldComponentUpdate from "../common/shouldupdate";

import PhotoComponent from "../shared/photo_component";

import User from "../../stores/users_store";
import Message from "../../stores/messages_store";

class MessageComponent extends React.Component {
  constructor() {
    super();

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  renderMessage() {
    var message = this.props.message;

    return (
      <div className="col-md-10 message-content">
        <div className="message-body">
          {Message.body(message)}
        </div>
        <div className="message-details">
          {Message.getTime(message).fromNow()}
        </div>
      </div>
    );
  }

  renderFromDetails() {
    var message = this.props.message;
    var messageFrom = Message.fromUser(message);

    return (
      <div className="col-md-2 user-details">
        <PhotoComponent url={User.photoUrl(messageFrom)}/>
        <div className="username">
          {User.username(messageFrom)}
        </div>
      </div>
    );
  }

  render() {
    var message = this.props.message;
    var messageFrom = Message.fromUser(message);

    if(User.isCurrentUser(messageFrom)) {
      return (
        <div className="row message message-alpha">
          {this.renderMessage()}
          {this.renderFromDetails()}
        </div>
      );
    } else {
      return (
        <div className="row message message-beta">
          {this.renderFromDetails()}
          {this.renderMessage()}
        </div>
      );
    }
  }
}

export default MessageComponent;
