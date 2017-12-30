import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PrimaryPhoto from "../components/PrimaryPhoto";
import PhotosetList from "../components/PhotosetList";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let photosets = this.props.photosets;
    let photoset = photosets[Math.floor(Math.random() * photosets.length)];
    return (
      <div>
        <PrimaryPhoto
          photosetid={(photoset && photoset.id) || 0}
          photosets={photosets}
          homepage={true}
        />
        <PhotosetList userinfo={this.props.userinfo} photosets={photosets} />
      </div>
    );
  }
}
