import React from "react";
import classNames from "classnames";

import component from "../common/component";
import shouldComponentUpdate from "../common/shouldupdate";

import UserComponent from "./user_component";
import MessagesPane from "../messages/messages_pane";

import User from "../../stores/users_store";

class UsersMessageListComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      activeUserId: null
    };

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(otherUser) {
    return () => {
      this.setState({activeUserId: User.id(otherUser)});
    };
  }

  render() {
    var otherUsers = User.getUsers();
    var activeUserId = this.state.activeUserId;

    return (
      <div className="users-messages row">
        <div className="user-message-view">
          <MessagesPane
            key={activeUserId}
            user={User.getCurrentUser()}
            otherUser={User.getUserById(activeUserId)}/>
        </div>
        <div className="user-list">
          {
            otherUsers.map((otherUser, id) => {
              return (
                <UserComponent
                  key={id}
                  user={otherUser}
                  className={classNames({selected: id === activeUserId})}
                  onClick={this.handleClick(otherUser)}/>
              );
            }).toList()
          }
        </div>
      </div>
    );
  }
}

UsersMessageListComponent = component(UsersMessageListComponent, {
  users: ["state", "users"],
  currentUser: ["state", "currentUser"]
});

export default UsersMessageListComponent;
