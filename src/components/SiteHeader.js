import React from "react";
import { NavLink } from "react-router-dom";
import SiteNav from "./SiteNav";
import Logo from "./Logo";

export default class SiteHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="site-header">
        <div className="wrapper cf">
          <div className="site-header__left">
            <Logo userinfo={this.props.userinfo} />
          </div>
          <div className="site-header__right">
            <SiteNav photosets={this.props.photosets} />
          </div>
        </div>
      </header>
    );
  }
}
