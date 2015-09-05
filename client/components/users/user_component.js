import React from "react";
import classNames from "classnames";

import shouldComponentUpdate from "../common/shouldupdate";

import PhotoComponent from "../shared/photo_component";

import User from "../../stores/users_store";

class UserComponent extends React.Component {
  constructor() {
    super();

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  user() {
    return this.props.user;
  }

  render() {
    var user = this.user();

    return (
      <div className={classNames("user-detail-row", "row", this.props.className)} onClick={this.props.onClick}>
        <div className="col-md-5">
          <PhotoComponent url={User.photoUrl(user)}/>
        </div>
        <div className="col-md-7 username">
          {User.username(user)}
        </div>
      </div>
    );
  }
}

export default UserComponent;
