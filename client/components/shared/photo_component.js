import React from "react";
import classNames from "classnames";

import shouldComponentUpdate from "../common/shouldupdate";

export default class PhotoComponent extends React.Component {
  constructor() {
    super();

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render() {
    var imageStyle = {
      backgroundImage: `url(${this.props.url})`,
      backgroundSize: "cover"
    };

    return (
      <div className={classNames("photo", this.props.className)} style={imageStyle} />
    );
  }
}
