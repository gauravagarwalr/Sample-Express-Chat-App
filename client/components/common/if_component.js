import React from "react";

export default class If extends React.Component {
  render() {
    if (this.props.condition) {
      return React.Children.only(this.props.children);
    } else {
      return false;
    }
  }
}
