import React from "react";
import {RouteHandler} from "react-router";

import component from "./common/component";
import shouldComponentUpdate from "./common/shouldupdate";

class Layout extends React.Component {
  constructor() {
    super();

    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className="layout-container">
        <RouteHandler/>
      </div>
    );
  }
}

Layout = component(Layout, {
  state: ["state"]
});

export default Layout;
