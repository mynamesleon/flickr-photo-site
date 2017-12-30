import React from "react";
require("loaders.css/src/animations/ball-pulse.scss");

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={
          "loader transition" +
          (this.props.className ? " " + this.props.className : "")
        }
      >
        <div className="loader-inner ball-pulse">
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}
