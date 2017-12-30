import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import HTTP from "../utils/http";
import Loader from "./Loader";
import PhotoSlider from "./PhotoSlider";
const http = new HTTP();

export default class Photoset extends React.Component {
  constructor(props) {
    super(props);
    this.apiUrl = "/libs/api/getPhotoset.php";
    this.state = {
      primaryImage: "",
      notFound: false,
      loading: true,
      photos: [],
      title: ""
    };
  }

  userHasPhotoset() {
    const { photosets: photosets, photosetid: photosetid } = this.props;

    for (let i = 0; i < photosets.length; i += 1) {
      if (photosets[i].id === photosetid) {
        return true;
      }
    }
    return false;
  }

  getPhotos(i) {
    const photosetid = i || this.props.photosetid;

    if (i && i === this.props.photosetid) {
      return;
    }

    this.setState({
      loading: true
    });

    http
      .get(this.apiUrl, {
        PHOTOSET_ID: photosetid
      })
      .then(response => {
        if (response.data === false) {
          return this.setState({
            notFound: true
          });
        }
        const photoset = response.data.photoset;
        this.setState({
          loading: false,
          photos: photoset.photo,
          title: photoset.title
        });
        if (typeof this.props.onPhotoSetLoaded === "function") {
          this.props.onPhotoSetLoaded(photoset);
        }
      })
      .catch(() => {
        this.setState({
          notFound: true
        });
      });
  }

  componentDidMount() {
    this.getPhotos();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      photosets: nextProps.photosets
    });
    this.getPhotos(nextProps.photosetid);
  }

  componentWillUnmount() {
    http.cancel(this.apiUrl);
  }

  render() {
    let titleHTML = "";
    let loading = this.state.loading || this.props.photosets.length === 0;
    let redirect =
      this.state.notFound ||
      (this.props.photosets.length && !this.userHasPhotoset());

    if (this.props.photosetBasic.title || this.props.photosetFull.title) {
      titleHTML = (
        <h1
          className={
            "photo-slider--wrapper transition__opacity" +
            (this.props.photoid ? " fade-out" : "")
          }
        >
          {this.props.photosetBasic.title || this.props.photosetFull.title}
        </h1>
      );
    }

    if (redirect) {
      return <Redirect to="/not-found" />;
    }

    return (
      <section>
        <div className="wrapper relative">{titleHTML}</div>
        <PhotoSlider
          loading={loading}
          photos={this.state.photos}
          photoid={this.props.photoid}
          photoseturl={this.props.photoseturl}
          photosetFull={this.props.photosetFull}
        />
      </section>
    );
  }
}
