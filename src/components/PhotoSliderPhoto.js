import React from "react";
import { NavLink } from "react-router-dom";
import flickrPhotoUrl from "../utils/flickrPhotoUrl";

export default class PhotoSliderPhoto extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const p = this.props.photodata;
    const purl = this.props.photoseturl;
    const url = s => flickrPhotoUrl(p.farm, p.server, p.id, p.secret, s);
    const srcset = [
      url("m") + " 240w",
      url("n") + " 320w",
      url("z") + " 640w",
      url("c") + " 800w",
      url("b") + " 1024w"
    ];
    let linkUrl = purl;
    if (!this.props.isHomePage) {
      linkUrl += "/photo/" + p.id;
    }

    return (
      <NavLink to={linkUrl} className="swiper-slide">
        <div>
          <div>
            <figure className="image-fit-container">
              <img
                sizes="300px"
                className="image-fit-img"
                srcSet={srcset.join(", ")}
                src={url("z")}
                alt={p.title}
              />
              <figcaption>
                <span>{p.title}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </NavLink>
    );
  }
}
