import React from "react";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";

export default class SiteNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false
    };
  }

  toggleNav(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      navOpen: !this.state.navOpen
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      navOpen: false
    });
  }

  render() {
    let links = this.props.photosets.map((data, i) => {
      return (
        <li key={i}>
          <NavLink
            tabIndex={this.state.navOpen ? 0 : -1}
            to={"/album/" + data.id}
          >
            {data.title}
          </NavLink>
        </li>
      );
    });

    if (!links.length) {
      links = (
        <li>
          <Loader />
        </li>
      );
    }
    return (
      <div>
        <nav className="site-navigation">
          <a
            href="#"
            className={
              "menu-opener " + (this.state.navOpen ? "open" : "closed")
            }
            aria-haspopup="true"
            aria-expanded={this.state.navOpen}
            onClick={this.toggleNav.bind(this)}
          >
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </a>
          <div
            className={
              "nav-overlay " + (this.state.navOpen ? "open" : "closed")
            }
            aria-hidden={!this.state.navOpen}
            onClick={this.toggleNav.bind(this)}
          >
            <div className="nav-overlay__content">
              <ul>{links}</ul>
            </div>
          </div>
        </nav>
        <aside id="social" />
      </div>
    );
  }
}
