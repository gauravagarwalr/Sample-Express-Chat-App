import React from "react";

import component from "../common/component";
import shouldComponentUpdate from "../common/shouldupdate";

import MessageComponent from "./message_component";
import MessageBox from "./message_box";

import Message from "../../stores/messages_store";

class MessagesPane extends React.Component {
  constructor() {
    super();

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  componentWillMount() {
    this.scrollToLastMessage();
  }

  componentDidUpdate() {
    this.scrollToLastMessage();
  }

  scrollToLastMessage() {
    var user = this.props.user;

    if(user && !user.isEmpty()) {
      var messages = Message.getMessages(this.props.user);

      if(messages && !messages.isEmpty()) {
        var lastMessage = messages.sortBy(Message.getTime).reverse().first();
        var lastMessageRef = `message-${Message.id(lastMessage)}`;
        var lastMessageComponent = this.refs[lastMessageRef];

        if(lastMessageComponent) {
          lastMessageComponent.scrollIntoView();
        }
      }
    }
  }

  renderMessages() {
    var user = this.props.user;

    var messages = Message.getMessages(user);

    if(messages && !messages.isEmpty()) {
      return (
        <div className="message-list">
          {
            messages.sortBy(Message.getTime).map((message, messageId) => {
              return <MessageComponent
                ref={`message-${messageId}`}
                key={messageId}
                message={message}/>;
            }).toList()
          }
        </div>
      );
    } else {
      return (
        <span className="no-results">No recent messages found...</span>
      );
    }
  }

  render() {
    var user = this.props.user;

    if(user && !user.isEmpty()) {
      return (
        <div className="row message-pane">
          <div className="row message-list-container">
            {this.renderMessages()}
          </div>
          <MessageBox user={user}/>
        </div>
      );
    } else {
      return (
        <span className="no-results">
          No user found. Select a user to chat with..
        </span>
      );
    }
  }
}

MessagesPane = component(MessagesPane, {
  userId: ["state", "route", "params", "userId"],
  user: ["state", "users", "computed.userId"],
  currentUser: ["state", "currentUser"]
});

export default MessagesPane;
