import React from "react";

import component from "../common/component";
import shouldComponentUpdate from "../common/shouldupdate";

import User from "../../stores/users_store";

class ProfileComponent extends React.Component {
  constructor() {
    super();

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <span>{User.name(User.getCurrentUser())}</span>
    );
  }
}

ProfileComponent = component(ProfileComponent, {
  currentUser: ["state", "currentUser"]
});

export default ProfileComponent;
