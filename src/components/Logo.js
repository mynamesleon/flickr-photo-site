import React from "react";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";

export default class Logo extends React.Component {
  render() {
    let userinfo = this.props.userinfo;
    let username = userinfo.username;

    return (
      <div id="logo" className="logo">
        {!username ? (
          <Loader />
        ) : (
          <div>
            <NavLink
              to="/"
              className="logo__username h2 font-default font-lighter"
            >
              {username}
            </NavLink>
            <a
              href={userinfo.profileurl}
              className="logo__location"
              target="_blank"
            >
              &copy; {userinfo.realname}
            </a>
          </div>
        )}
      </div>
    );
  }
}
