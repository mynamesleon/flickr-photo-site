import React from "react";
import Photoset from "../components/Photoset";
import PrimaryPhoto from "../components/PrimaryPhoto";

export default class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photosetFull: {}
    };
  }

  render() {
    const photosetid = this.props.match.params.photosetid;
    let props = {
      photoid: this.props.match.params.photoid,
      photosetFull: this.state.photosetFull,
      photosetBasic:
        (() => {
          for (let i = 0, p = this.props.photosets; i < p.length; i += 1) {
            if (p[i].id === photosetid) {
              return p[i];
            }
          }
        })() || {},
      photosets: this.props.photosets,
      photosetid: photosetid
    };

    return (
      <div>
        <PrimaryPhoto {...props} />
        <Photoset
          photoseturl={"/album/" + this.props.match.params.photosetid}
          onPhotoSetLoaded={p => {
            this.setState({
              photosetFull: p
            });
          }}
          {...props}
        />
      </div>
    );
  }
}
