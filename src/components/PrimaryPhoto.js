import React from "react";
import { Redirect } from "react-router-dom";
import imageFit from "imagefit";
import Loader from "./Loader";
import HTTP from "../utils/http";
import getPhotoData from "../utils/getPhotoData";
import flickrPhotoUrl from "../utils/flickrPhotoUrl";
import flickrdata from "../flickrdata";
const http = new HTTP();

export default class PrimaryPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.apiUrl = "/libs/api/getPhotoSizes.php";
    this.defaultPhotoId = 0;
    this.newImage = null;
    this.oldImage = null;

    this._isMounted = false;
    this._photoset = {};

    this.flickrUrl = s => {
      let p = this._photoset;
      return flickrPhotoUrl(p.farm, p.server, p.id, p.secret, s);
    };

    this.state = {
      notFound: false,
      loading: true,
      new: "",
      old: ""
    };
  }

  getPhotoName(id) {
    if (!id || !this.props.photosetFull) {
      return "";
    }
    return getPhotoData(id, this.props.photosetFull).title;
  }

  // if photoid is provided, check that the photoset includes a photo with that id
  photoIsInPhotoset() {
    let photoset = this.props.photosetFull;
    let photoid = this.props.photoid;

    if (photoid && photoset && photoset.photo && photoset.photo.length) {
      let photos = photoset.photo;
      let length = photos.length;
      let proceed = false;
      for (let i = 0; i < length; i += 1) {
        if (photos[i].id === photoid) {
          proceed = true;
          break;
        }
      }
      if (!proceed) {
        return false;
      }
    }
    return true;
  }

  setDefaultPhotoId(p, pid) {
    if (this._photoset && this._photoset.id === pid) {
      this.defaultPhotoId = this._photoset.primary;
      return;
    }
    for (let i = 0, l = p.length; i < l; i += 1) {
      if (p[i].id === pid) {
        this.defaultPhotoId = p[i].primary;
        this._photoset = p[i];
        break;
      }
    }
  }

  getPhoto(id) {
    if (!id) {
      return;
    }

    this.setState({
      loading: true
    });

    http
      .get(this.apiUrl, {
        PHOTO_ID: id
      })
      .then(response => {
        if (response.data === false) {
          return this.setState({
            notFound: true
          });
        }

        let original;
        let srcset = response.data.map(i => {
          if (i.label.toLowerCase().indexOf("original") > -1) {
            original = i.source;
          }
          return `${i.source} ${i.width}w`;
        });

        if (flickrdata.PRELOAD_IMAGES) {
          this.loadPhoto(original, srcset, id);
        } else {
          this.setState({
            loading: false,
            old: this.state.new,
            new: this.createImage(original, srcset, id)
          });
        }
      })
      .catch(err => {
        this.setState({
          notFound: true
        });
      });
  }

  createImage(o, s, i) {
    return (
      <img
        srcSet={s.join(", ")}
        src={o}
        className="image-fit-img"
        alt={this.getPhotoName(i) || i}
        ref={img => (this.newImage = img)}
      />
    );
  }

  loadPhoto(o, s, i) {
    let img = new Image();
    img.onload = () => {
      if (this._isMounted) {
        this.setState({
          loading: false,
          old: this.state.new,
          new: this.createImage(o, s, i)
        });
      }
    };
    img.onerror = () => {
      if (this._isMounted) {
        this.setState({
          notFound: true
        });
      }
    };
    img.setAttribute("srcset", s.join(", "));
    img.setAttribute("src", o);
  }

  fitImage(i) {
    if (i && i.className.indexOf("fitted") === -1) {
      imageFit(i);
    }
  }

  photoPrep(n) {
    let photoid = n.photoid;
    if (n.photosetid && n.photosets.length) {
      this.setDefaultPhotoId(n.photosets, n.photosetid);
    }
    if (this.state.new) {
      this.setState({
        old: this.state.new
      });
    }
    this.getPhoto(photoid || this.defaultPhotoId);
  }

  componentWillReceiveProps(n) {
    http.cancel(this.apiUrl);
    if (this._isMounted) {
      this.photoPrep(n);
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.photoPrep(this.props);
  }

  componentDidUpdate() {
    this.fitImage(this.newImage);
    this.fitImage(this.oldImage);
  }

  componentWillUnmount() {
    this._isMounted = false;
    http.cancel(this.apiUrl);
  }

  render() {
    let img = "";
    let loader = "";
    let header = "";

    if (this.state.notFound || !this.photoIsInPhotoset()) {
      return <Redirect to="/not-found" />;
    }

    if (this.props.photoid) {
      let title = this.getPhotoName(this.props.photoid) || "";
    }

    return (
      <section>
        <figure
          className={
            "image-fit-container primary-photo primary-photo__old transition" +
            (this.state.loading ? " fade-out__half" : "")
          }
        >
          {this.state.old}
        </figure>
        <figure
          className={
            "image-fit-container primary-photo primary-photo__new transition" +
            (this.state.loading ? " fade-out" : "")
          }
        >
          {this.state.new}
        </figure>
        <div className="image-fit-container primary-photo__blocker" />
        <Loader
          className={
            "primary-photo__loader" + (!this.state.loading ? " fade-out" : "")
          }
        />
      </section>
    );
  }
}
