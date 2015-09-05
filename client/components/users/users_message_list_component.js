import React from "react";
import {Link, RouteHandler} from "react-router";

import component from "../common/component";
import shouldComponentUpdate from "../common/shouldupdate";

import UserComponent from "./user_component";

import User from "../../stores/users_store";
import Message from "../../stores/messages_store";

class UsersMessageListComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      interval: null
    };

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  componentWillMount() {
    var interval = setInterval(() => {
      var users = User.getUsers();

      users.forEach((user) => Message.fetchMessages(user));
    }, 3000);

    this.setState({interval: interval});
  }

  componentWillUnmount() {
    clearInterval(this.state, interval);
  }

  render() {
    var users = User.getUsers();

    // var activeUserId = this.props.userId;

    return (
      <div className="users-messages row">
        <div className="user-message-view">
          <RouteHandler/>
        </div>
        <div className="user-list">
          {
            users.map((user, id) => {
              return (
                <Link to="messages" params={{userId: id}} key={id}>
                  <UserComponent user={user}/>
                </Link>
              );
            }).toList()
          }
        </div>
      </div>
    );
  }
}

UsersMessageListComponent = component(UsersMessageListComponent, {
  userId: ["state", "route", "params", "userId"],

  users: ["state", "users"],
  currentUser: ["state", "currentUser"]
});

export default UsersMessageListComponent;
