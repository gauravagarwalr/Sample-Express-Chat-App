import React from "react";

export default class LoaderComponent extends React.Component {
  render() {
    return (
      <div className="loader">
        <div className="spinner">
          <div className="cube1"></div>
          <div className="cube2"></div>
        </div>
      </div>
    );
  }
}
