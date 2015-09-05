import React from "react";
import Promise from "bluebird";
import {RouteHandler} from "react-router";

import component from "./common/component";
import shouldComponentUpdate from "./common/shouldupdate";

import User from "../stores/users_store";

class Layout extends React.Component {
  constructor() {
    super();

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className="chat-app-container">
        <RouteHandler/>
      </div>
    );
  }
}

Layout = component(Layout, {
  state: ["state"]
}, () => Promise.all([User.fetchCurrentUser(), User.fetchUsers()]));

export default Layout;
