import React from "react";
import lodash from "lodash";
import classNames from "classnames";

import shouldComponentUpdate from "../common/shouldupdate";

import User from "../../stores/users_store";
import Message from "../../stores/messages_store";

class MessageComponent extends React.Component {
  constructor() {
    super();

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  scrollIntoView() {
    var node = React.findDOMNode(this);
    if(node) {
      if(lodash.isFunction(node.scrollIntoViewIfNeeded)) {
        node.scrollIntoViewIfNeeded();
      } else if(lodash.isFunction(node.scrollIntoView)) {
        node.scrollIntoView();
      }
    }
  }

  render() {
    var message = this.props.message;
    var messageFrom = Message.fromUser(message);

    return (
      <div className={classNames("message", {"sent-by-current-user": User.isCurrentUser(messageFrom)})}>
        <div className="message-user">{User.name(messageFrom)}</div>
        <div className="message-body">{Message.body(message)}</div>
      </div>
    );
  }
}

export default MessageComponent;
