import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import logo from "./logo.jpg";
class Home extends Component {
  state = {
    authClass: "clappsed"
  };
  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    document.body.style = "background: #FFFFFF";
    this.resize();
  }
  resize = () => {
    console.log(window.innerWidth);
    if (window.innerWidth <= 1000) {
      this.setState({ authClass: "clappsed" });
    } else {
      this.setState({ authClass: "expanded" });
    }
  };
  render() {
    let sigupAD = <div></div>;
    let sigupBTN = <div></div>;
    let cardcontainer = "card-container";
    let cardclass = "card card-box";
    let homeadventiseGettheapp = "home-adventise-Gettheapp";
    let homeAdventiseGettheappAd = "home-adventise-Gettheapp-ad";
    const { authClass } = this.state;
    if (authClass === "expanded") {
      sigupAD = (
        <div className="home-adventise-signup">
          <h1>
            Discover and share the <br />
            world’s best photos
          </h1>

          <p>
            Get inspired with incredible photos from diverse styles and genres
            <br />
            around the world. We're not guided by fads—just great photography.
          </p>
          <button className="btn btn-dark btn-lg home-adventise-signupbtn">
            Sign up
          </button>
        </div>
      );
      sigupBTN = "";
      cardcontainer = "card-container";
      cardclass = "card card-box";
      homeadventiseGettheapp = "home-adventise-Gettheapp";
      homeAdventiseGettheappAd = "home-adventise-Gettheapp-ad";
    } else {
      //collapsed
      sigupAD = (
        <div className="home-adventise-signup">
          <h4>Discover and share the world’s best photos</h4>
        </div>
      );
      sigupBTN = (
        <div className="sigupBTN-clappse">
          <p>
            Get inspired with incredible photos from diverse styles and genres
            around the world. We're not guided by fads—just great photography.
          </p>
          <button className="btn btn-dark btn-lg btn-block">Sign up</button>
        </div>
      );
      cardcontainer = "card-container-collapsed";
      cardclass = "card card-box-collapsed";
      homeadventiseGettheapp = "home-adventise-Gettheapp-collapsed";
      homeAdventiseGettheappAd = "home-adventise-Gettheapp-ad";
    }
    return (
      <div className="home-adventise-top-body">
        <div className="home-adventise-body">
          <div className="home-adventise">
            <img
              className="home-adventise-img1"
              src={"/static/home/logo1.jpg"}
              alt=""
            />
            {sigupAD}
            <img
              className="home-adventise-img2"
              src={"/static/home/logo.jpg"}
              alt=""
            />
          </div>
          <div id="wave"></div>
        </div>
        <div>
          {sigupBTN}
          <h2 className="card-header">What makes us different</h2>
          <div className={cardcontainer}>
            <div className={cardclass}>
              <img
                className="card-box-img"
                src={"/static/home/Grow_as_a_photographer.jpg"}
                alt="Card image"
              />
              <div className="card-body">
                <h4 className="card-title">Grow as a photographer</h4>
                <h6 className="card-subtitle mb-2 text-muted"></h6>
                <p className="card-text">
                  Get immediate exposure with your first upload. Our Pulse
                  algorithm will take your photo through Discover where it will
                  be seen by thousands and you'll receive valuable feedback on
                  day one.
                </p>
              </div>
            </div>

            <div className={cardclass}>
              <img
                className="card-box-img"
                src={"/static/home/Build_your_career.jpg"}
                alt="Card image"
              />
              <div className="card-body">
                <h4 className="card-title">Build your career</h4>
                <h6 className="card-subtitle mb-2 text-muted"></h6>
                <p className="card-text">
                  Present yourself as a professional. Get hired by displaying
                  your services, create a Directory listing, showcase the
                  workshops you're holding, and create Galleries to highlight
                  your work.
                </p>
              </div>
            </div>

            <div className={cardclass}>
              <img
                className="card-box-img"
                src={"/static/home/See_how_youre_performing.jpg"}
                alt="Card image"
              />
              <div className="card-body">
                <h4 className="card-title">See how you're performing</h4>
                <h6 className="card-subtitle mb-2 text-muted"></h6>
                <p className="card-text">
                  With Advanced Statistics and Pulse you get valuable insights
                  into how your photos are performing and how you rank in
                  comparison to other photographers in the community.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={homeadventiseGettheapp}>
          <div className={homeAdventiseGettheappAd}>
            <h2>Get the app</h2>
            <p>
              Join our community of over 15 million like-minded photographers on
              our desktop experience or Android and iOS apps.
            </p>
            <div className="d-flex">
              <button className="btn btn-dark mr-2 home-appstore">
                <a
                  className="home-appstore-link"
                  href="https://itunes.apple.com/app/500px/id471965292"
                >
                  <i className="fab fa-apple fa-2x"></i>
                </a>
                <div className="home-appstore-text">
                  Download on the
                  <p>App Store</p>
                </div>
              </button>
              <button className="btn btn-dark home-android">
                <a
                  className="home-appstore-link"
                  href="https://play.google.com/store/apps/details?id=com.fivehundredpx.viewer"
                >
                  <i className="fab fa-google-play fa-2x"></i>
                </a>
                <div className="home-appstore-text">
                  GET IT ON
                  <p>Google Play</p>
                </div>
              </button>
            </div>
          </div>
          <img
            className="home-adventise-Gettheapp-img"
            src="/static/home/devices_desktop@2x.ac557454.png"
            alt=""
          />
        </div>
      </div>
    );
  }
}

Home.propTypes = {};

export default Home;
