import React from "react";

import shouldComponentUpdate from "../common/shouldupdate";

import Message from "../../stores/messages_store";

class MessageBox extends React.Component {
  constructor() {
    super();

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className="row message-box">
        <span>You can type here</span>
      </div>
    );
  }
}

export default MessageBox;
