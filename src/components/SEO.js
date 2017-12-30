import React from "react";
import { Helmet } from "react-helmet";
import headTags from "../utils/headTags";
import getPhotoData from "../utils/getPhotoData";
import flickrPhotoUrl from "../utils/flickrPhotoUrl";

export default class SEO extends React.Component {
  constructor(props) {
    super(props);
  }

  headTags(title, description, url, image) {
    return headTags(title, description, url, image);
  }

  getPhotoData(id) {
    if (!id || !this.props.photosetFull) {
      return;
    }
    return getPhotoData(id, this.props.photosetFull);
  }

  render() {
    let url = "";
    let title = "";
    let titleSuffix = "";
    let image = "";
    let description = "";
    let userinfo = {};

    let w = window;
    let props = this.props;

    if (this.props.userinfo !== undefined && this.props.userinfo.username) {
      userinfo = this.props.userinfo;
      titleSuffix =
        " | " +
        userinfo.username +
        (userinfo.username.toLowerCase().indexOf("photography") > -1
          ? ""
          : " photography");
    }

    if (props.photoid && props.photosetFull) {
      let p = this.getPhotoData(props.photoid, props.photosetFull);
      title = (p.title || p.id) + titleSuffix;
      description = p.description;
      image = flickrPhotoUrl(p.farm, p.server, p.id, p.secret, "b");
    } else if (props.photosetBasic || props.photosetFull) {
      let p = props.photosetFull || props.photosetBasic;
      title = (p.title || "Album") + titleSuffix;
      description = p.description;
      image = flickrPhotoUrl(p.farm, p.server, p.primary, p.secret, "b");
    } else if (props.homePhotoset) {
      let p = props.homePhotoset;
      title = titleSuffix.slice(3);
      description = userinfo.description;
      image = flickrPhotoUrl(p.farm, p.server, p.primary, p.secret, "b");
    }

    if (props.location && props.location.pathname) {
      url = ((w.location && w.location.origin) || "") + props.location.pathname;
    }

    return <Helmet>{headTags(title, description, url, image)}</Helmet>;
  }
}
