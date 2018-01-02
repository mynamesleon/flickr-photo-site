import React from "react";
import SiteHeader from "../components/SiteHeader";
import Main from "./Main";
import Error from "./Error";
import HTTP from "../utils/http";
import shuffleArray from "../utils/shuffleArray";
import flickrdata from "../flickrdata";
const http = new HTTP();

// todo: handle primary calls failing

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.callsComplete = 0;
    this.state = {
      requestFailed: false,
      photosets: [],
      userinfo: {}
    };
  }

  setFailed(v = true) {
    this.setState({
      requestFailed: v
    });
  }

  componentDidMount() {
    http
      .get("/libs/api/getPhotosets.php")
      .then(response => {
        if (response.data === false || typeof response.data !== "object") {
          return this.setFailed();
        }
        this.setState({
          photosets:
            flickrdata.RANDOMISE || flickrdata.RANDOMIZE
              ? shuffleArray(response.data.photoset)
              : response.data.photoset
        });
      })
      .catch(err => {
        this.setFailed();
      });

    http
      .get("/libs/api/getInfo.php")
      .then(response => {
        if (response.data === false || typeof response.data !== "object") {
          return this.setFailed();
        }
        this.setState({
          userinfo: response.data
        });
      })
      .catch(err => {
        this.setFailed();
      });
  }

  render() {
    let { userinfo, photosets, requestFailed } = this.state;
    if (requestFailed) {
      return <Error />;
    }
    return (
      <div>
        <SiteHeader userinfo={userinfo} photosets={photosets} />
        <Main userinfo={userinfo} photosets={photosets} />
      </div>
    );
  }
}
