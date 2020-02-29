import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHomefeed, getMoreHomefeed } from "../../Redux/photo/photoAction";
import PhotoCard from "./photoCard";

class HomeFeeds extends Component {
  constructor(props) {
    super(props);
    console.log("props ->", this.props);

    this.state = {
      showPopup: false,
      Home_Feeds_body_style: "card-main-body"
    };
  }
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
    if (this.props.hideBackground) {
      this.props.hideBackground(!this.state.showPopup);
    }
  };
  componentDidMount() {
    this.props.getHomefeed(this.props.fetchUrl);
  }

  fetchMore = e => {
    e.preventDefault();
    console.log("fetchMore");
    const { homeFeedPhotos } = this.props;

    if (homeFeedPhotos.next) {
      this.props.getMoreHomefeed(homeFeedPhotos.next);
    }
  };
  render() {
    console.log("feedType ->", this.props.feedType);
    let { homeFeed } = this.props.homeFeedPhotos;
    const { searchText } = this.props;
    console.log("searchText -> ", searchText);

    homeFeed = homeFeed.filter(homefeed => {
      console.log(searchText);

      if (searchText == "") {
        console.log("searchText empty");

        return homefeed;
      } else {
        if (homefeed.name == null || homefeed.name == "") return null;

        return homefeed.name.includes(searchText);
      }
    });

    console.log("homeFeed -> ", homeFeed);
    let Home_Feeds_body_style = "card-main-body";
    let headerName = "";
    if (this.state.showPopup) {
      Home_Feeds_body_style = "card-main-body-hidden";
      headerName = "";
    }

    if (this.props.homefeeds == "homefeeds") {
      if (this.state.showPopup) {
        headerName = "";
      } else {
        headerName = <h2>Home Feed</h2>;
      }
    }

    return (
      <div className="home-feeds-body">
        {headerName}
        <div className={Home_Feeds_body_style}>
          {homeFeed.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              homefeeds={this.props.homefeeds}
              photo={photo}
              togglePopup={this.togglePopup}
              index={index}
            />
          ))}
          {this.props.homeFeedPhotos.next != null ? (
            <button onClick={this.fetchMore} className="btn loadmore-btn">
              Load more...
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

HomeFeeds.propTypes = {};
const mapDispatchToProps = dispatch => {
  return {
    getHomefeed: fetchUrl => dispatch(getHomefeed(fetchUrl)),
    getMoreHomefeed: fetchUrl => dispatch(getMoreHomefeed(fetchUrl))
  };
};
const mapStateToProp = (state, ownProps) => {
  console.log("ownProps ", ownProps.Homefeed);
  // const PhotoFeeds = state.homeFeedPhotos ? ownProps.Homefeed :
  return {
    homeFeedPhotos: state.homeFeedPhotos
  };
};
export default connect(mapStateToProp, mapDispatchToProps)(HomeFeeds);
