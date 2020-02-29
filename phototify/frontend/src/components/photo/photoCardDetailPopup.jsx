import React, { Component } from "react";
import PropTypes from "prop-types";
// import "./style.css";
import PhotoInfo from "./photoInfo";
import PhotoComments from "./photoComments";
import { connect } from "react-redux";
import CloseBtn from "./closeBtn";
import store from "../../Redux/store";
import axios from "axios";
import { getConfigHeader } from "../common/helper";

class PhotoCardDetailPopup extends Component {
  // const PhotoCardDetailPopup = ({ closePopup, photo }) => {
  constructor(props) {
    super(props);
    this.state = {
      photo: this.props.photo,
      index: this.props.index,
      comments: []
    };
  }
  componentDidMount() {
    this._isMounted = true;
    console.log("PhotoCardDetailPopup-> ", this.state.photo);

    this.getComments(this.state.photo.id);
  }
  goRigthPhoto = () => {
    console.log(" go rigth");
    const index = this.state.index + 1;
    if (index < this.props.homeFeedPhotos.homeFeed.length) {
      this.setState({ index });
      this.setState({ photo: this.props.homeFeedPhotos.homeFeed[index] });
      this.getComments(this.props.homeFeedPhotos.homeFeed[index].id);
    }
  };
  goLeftPhoto = () => {
    const index = this.state.index - 1;
    if (index >= 0) {
      console.log(" go left");
      this.setState({ index });
      this.setState({ photo: this.props.homeFeedPhotos.homeFeed[index] });
      this.getComments(this.props.homeFeedPhotos.homeFeed[index].id);
    }
  };
  getComments(index) {
    const photoId = index;
    console.log("photoId ", photoId);

    const config = {
      headers: {
        "content-type": "application/json"
      }
    };
    let token = store.getState().auth.token;
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    axios
      .get(`/api/photoComment/?photoId=${photoId}`, config)
      .then(res => {
        this.setState({ comments: res.data.results });
      })
      .catch(err => {
        console.log(err);
      });
    console.log("fet com finish");
  }
  postComment = (comment, clearComment) => {
    // e.preventDefault();
    const photoId = this.state.photo.id;
    const body = JSON.stringify({ photoId, comment });
    console.log("body ", body);

    console.log("comm posted ->", comment);
    axios
      .post("/api/photoComment/", body, getConfigHeader())
      .then(res => {
        this.setState({ comments: [res.data].concat(this.state.comments) });
        clearComment();
      })
      .catch(err => {
        return "false";
      });
  };
  render() {
    const { photo, index } = this.state;
    const { closePopup } = this.props;
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="popup-photo-window">
            <div className="popup-photo-left-nav">
              <CloseBtn closePopup={closePopup} />
              <button
                onClick={this.goLeftPhoto}
                className="popup-left-arrow popup-btn-animation"
              >
                <i className="fas fa-chevron-left fa-2x"></i>
              </button>
            </div>
            {/* <div className="popup-photo-container"> */}
            <img className="popup-photo" src={photo.photo} alt="" />
            {/* </div> */}
            <div className="popup-photo-right-nav">
              <button className="popup-expand">
                <i className="fas fa-expand-arrows-alt fa-2x"></i>
              </button>
              <button
                onClick={this.goRigthPhoto}
                className="popup-right-arrow popup-btn-animation"
              >
                <i className="fas fa-chevron-right fa-2x"></i>
              </button>
            </div>
          </div>
          <div className="popup-photo-info-container">
            <PhotoInfo photo={photo} homefeeds={this.props.homefeeds} />
            <PhotoComments
              photoId={photo.id}
              postComment={this.postComment}
              comments={this.state.comments}
            />
          </div>
        </div>
      </div>
    );
  }
}

PhotoCardDetailPopup.propTypes = {};
const mapStateToProp = (state, ownProps) => {
  return {
    homeFeedPhotos: state.homeFeedPhotos,
    user: state.auth.user
  };
};
export default connect(mapStateToProp)(PhotoCardDetailPopup);
