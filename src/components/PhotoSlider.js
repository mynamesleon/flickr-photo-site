import React from "react";
import Swiper from "swiper/dist/js/swiper.js";
import Loader from "./Loader";
import PhotoSliderPhoto from "./PhotoSliderPhoto";
import getPhotoData from "../utils/getPhotoData";
import flickrdata from "../flickrdata";

export default class PhotoSlider extends React.Component {
  constructor(props) {
    super(props);
    this.initialised = false;
    this.slider = null;
    this.state = {
      collapsed: false
    };
  }

  toggleCollapsedState(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  initialiseSlider() {
    this.slider = new Swiper("#photo-slider", {
      a11y: true,
      slidesPerView: 6,
      slidesPerGroup: 6,
      spaceBetween: -4,
      navigation: {
        nextEl: "#swiper-button-next",
        prevEl: "#swiper-button-prev"
      },
      breakpoints: {
        1024: {
          slidesPerView: 5,
          slidesPerGroup: 5
        },
        768: {
          slidesPerView: 4,
          slidesPerGroup: 4
        },
        600: {
          slidesPerView: 3,
          slidesPerGroup: 3
        },
        320: {
          slidesPerView: 2,
          slidesPerGroup: 2
        }
      }
    });
  }

  updateDOM() {
    if (this.props.photos.length) {
      if (!this.slider) {
        this.initialiseSlider();
      } else {
        this.slider.update();
      }
    }
  }

  componentDidUpdate() {
    this.updateDOM();
  }

  componentDidMount() {
    this.updateDOM();
  }

  componentWillUnmount() {
    if (this.slider) {
      this.slider.destroy();
    }
  }

  render() {
    let loader = "";
    let phototitle =
      getPhotoData(this.props.photoid, this.props.photosetFull).title || "";
    let photoseturl = this.props.photoseturl;
    let images = this.props.photos.map((p, i) => {
      return (
        <PhotoSliderPhoto
          photoseturl={photoseturl || p.photoseturl}
          isHomePage={this.props.isHomePage}
          photodata={p}
          key={i}
        />
      );
    });

    if (this.props.loading) {
      loader = <Loader className="photo-slider__loader" />;
    }

    return (
      <div
        className={"photo-slider" + (this.state.collapsed ? " collapsed" : "")}
      >
        <div className="wrapper relative">
          <div className="photo-slider--wrapper photo-slider--controls">
            <span
              className={
                "photo-slider--title transition__opacity" +
                (this.state.collapsed ? "" : " fade-out")
              }
            >
              {phototitle}
            </span>
            <button
              className="swiper-button-next swiper-button-white photo-slider--toggle"
              title="Toggle slider"
              aria-label="Toggle slider"
              onClick={e => {
                this.toggleCollapsedState.call(this, e);
              }}
            />
          </div>
        </div>
        <div className="wrapper relative photo-slider--main">
          <div
            id="photo-slider"
            className={
              "swiper-container transition__opacity" +
              (this.props.loading ? " fade-out__half" : "") +
              (this.props.photos.length ? " swiper-container--bordered" : "")
            }
          >
            <div className="swiper-wrapper">{images}</div>
          </div>
          <div
            id="swiper-button-next"
            className="swiper-button-next swiper-button-white"
          >
            <span>Next</span>
          </div>
          <div
            id="swiper-button-prev"
            className="swiper-button-prev swiper-button-white"
          >
            <span>Prev</span>
          </div>
          {loader}
        </div>
      </div>
    );
  }
}
