import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import HTTP from "../utils/http";
import Loader from "./Loader";
import PhotoSlider from "./PhotoSlider";
import flickrdata from "../flickrdata";
import shuffleArray from "../utils/shuffleArray";
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
          photos:
            flickrdata.RANDOMISE || flickrdata.RANDOMIZE
              ? shuffleArray(photoset.photo)
              : photoset.photo,
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
    http.cancel(this.apiUrl);
    this.setState({
      photosets: nextProps.photosets
    });
    this.getPhotos(nextProps.photosetid);
  }

  componentWillUnmount() {
    http.cancel(this.apiUrl);
  }

  render() {
    let title = "";
    let loading = this.state.loading || this.props.photosets.length === 0;
    let photosetBasic = this.props.photosetBasic;
    let photosetFull = this.props.photosetFull;
    let redirect =
      this.state.notFound ||
      (this.props.photosets.length && !this.userHasPhotoset());

    if (photosetBasic.title || photosetFull.title) {
      title = (
        <div
          className={
            "photo-slider--wrapper transition__opacity" +
            (this.props.photoid ? " fade-out cursor-default" : "")
          }
        >
          <h1>{photosetBasic.title || photosetFull.title}</h1>
          <p>{photosetBasic.description || ""}</p>
        </div>
      );
    }

    if (redirect) {
      return <Redirect to="/not-found" />;
    }

    return (
      <section>
        <div className="wrapper relative">{title}</div>
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
