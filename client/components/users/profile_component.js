import React from "react";

import component from "../common/component";
import shouldComponentUpdate from "../common/shouldupdate";

// import User from "../stores/users_store";

class ProfileComponent extends React.Component {
  constructor() {
    super();

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  currentUser() {
    return this.props.currentUser;
  }

  render() {
    return (
      <span>Hello World</span>
    );
  }
}

ProfileComponent = component(ProfileComponent, {
  state: ["state"],
  currentUser: ["state", "currentUser"]
});

export default ProfileComponent;
