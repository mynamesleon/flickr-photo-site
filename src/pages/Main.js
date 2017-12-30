import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Error from "./Error";
import Album from "./Album";
import NotFound from "./NotFound";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userinfo = this.props.userinfo;
    let photosets = this.props.photosets;
    return (
      <main role="main" id="main">
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home userinfo={userinfo} photosets={photosets} {...props} />
            )}
          />
          <Route
            path="/album/:photosetid/photo/:photoid/"
            render={props => (
              <Album userinfo={userinfo} photosets={photosets} {...props} />
            )}
          />
          <Route
            path="/album/:photosetid/"
            render={props => (
              <Album userinfo={userinfo} photosets={photosets} {...props} />
            )}
          />
          <Route exact path="/error" component={Error} />
          <Route component={NotFound} />
        </Switch>
      </main>
    );
  }
}
