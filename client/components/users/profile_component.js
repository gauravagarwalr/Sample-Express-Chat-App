import React from "react";

import component from "../common/component";
import shouldComponentUpdate from "../common/shouldupdate";

import User from "../../stores/users_store";

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
      <span>{User.name(this.currentUser())}</span>
    );
  }
}

ProfileComponent = component(ProfileComponent, {
  currentUser: ["state", "currentUser"]
}, User.getCurrentUser);

export default ProfileComponent;
