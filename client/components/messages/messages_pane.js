import React from "react";
import lodash from "lodash";
import VisibilitySensor from "react-visibility-sensor";

import component from "../common/component";
import shouldComponentUpdate from "../common/shouldupdate";

import MessageComponent from "./message_component";
import MessageBox from "./message_box";

import Message from "../../stores/messages_store";

class MessagesPane extends React.Component {
  constructor() {
    super();

    this.state = {
      autoScroll: true
    };

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    this.scrollToEnd = this.scrollToEnd.bind(this);
    this.toggleAutoScroll = this.toggleAutoScroll.bind(this);
  }

  componentWillMount() {
    this.scrollToEnd();
  }

  componentDidUpdate() {
    this.scrollToEnd();
  }

  toggleAutoScroll(value) {
    this.setState({autoScroll: value});
  }

  scrollToEnd(force) {
    var messageListBottomNode = this.refs.messageListBottom;

    if(this.state.autoScroll || force) {
      if(lodash.isUndefined(messageListBottomNode)) {
        setTimeout(() => this.scrollToEnd(true), 50);
        return false;
      } else {
        var node = React.findDOMNode(messageListBottomNode);

        if(node) {
          if(lodash.isFunction(node.scrollIntoViewIfNeeded)) {
            node.scrollIntoViewIfNeeded();
          } else if(lodash.isFunction(node.scrollIntoView)) {
            node.scrollIntoView();
          }
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
              return <MessageComponent key={messageId} message={message}/>;
            }).toList()
          }
          <div className="row" ref="messageListBottom" style={{height: "1px"}}>
            <VisibilitySensor onChange={this.toggleAutoScroll} partialVisibility={true}/>
          </div>
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
