import React from "react";
import PhotoSlider from "./PhotoSlider";

export default class PhotosetList extends React.Component {
  constructor(props) {
    super(props);
    this.elem = {};
  }

  render() {
    let title = "";
    let photosets = this.props.photosets;
    let loading = photosets.length === 0;
    let photos = photosets.map((p, i) => {
      return {
        photoseturl: "/album/" + p.id,
        server: p.server,
        secret: p.secret,
        title: p.title,
        id: p.primary,
        farm: p.farm
      };
    });

    if (this.props.userinfo.realname) {
      title = (
        <div className="photo-slider--wrapper">
          <h1>{this.props.userinfo.realname}</h1>
          <p>{this.props.userinfo.description}</p>
        </div>
      );
    }

    return (
      <section>
        <div className="wrapper relative">{title}</div>
        <PhotoSlider isHomePage={true} loading={loading} photos={photos} />
      </section>
    );
  }
}
