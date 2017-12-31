import React from "react";
import { NavLink } from "react-router-dom";
import flickrPhotoUrl from "../utils/flickrPhotoUrl";

export default class PhotoSliderPhoto extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const p = this.props.photodata;
    let linkUrl = this.props.photoseturl;
    const url = s => flickrPhotoUrl(p.farm, p.server, p.id, p.secret, s);
    if (!this.props.isHomePage) {
      linkUrl += "/photo/" + p.id;
    }

    return (
      <NavLink to={linkUrl} className="swiper-slide">
        <div>
          <div style={{ backgroundImage: "url(" + url("z") + ")" }}>
            <div className="caption">
              <span>{p.title}</span>
            </div>
          </div>
        </div>
      </NavLink>
    );
  }
}
