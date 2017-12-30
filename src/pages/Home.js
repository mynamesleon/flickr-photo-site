import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import PrimaryPhoto from "../components/PrimaryPhoto";
import PhotosetList from "../components/PhotosetList";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let photosets = this.props.photosets;
    let photoset = photosets[0];
    let photosetid = (photoset && photoset.id) || 0;

    return (
      <div>
        <PrimaryPhoto photosetid={photosetid} photosets={photosets} />
        <PhotosetList userinfo={this.props.userinfo} photosets={photosets} />
        <SEO
          photosetid={photosetid}
          photosets={photosets}
          homePhotoset={photoset}
          userinfo={this.props.userinfo}
        />
      </div>
    );
  }
}
