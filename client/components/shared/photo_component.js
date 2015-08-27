import React from "react";
import classNames from "classnames";

export default class PhotoComponent extends React.Component {
  getImageStyles(photoUrl) {
    return {
      backgroundImage: `url(${photoUrl})`,
      backgroundSize: "cover"
    };
  }

  render() {
    return (
      <div
        className={classNames("photo", this.props.className)}
        style={this.getImageStyles(this.props.url)} />
    );
  }
}
