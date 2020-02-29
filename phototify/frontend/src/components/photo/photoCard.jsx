import React, { Component, Fragment } from "react";
import PhotoCardDetailPopup from "./photoCardDetailPopup";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getHomefeed } from "../../Redux/photo/photoAction";

class PhotoCard extends Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }
  goBack = () => {
    console.log("go back");
    this.props.history.goBack();
  };
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
    this.props.togglePopup();
  };
  photoDesciption = des => {
    if (des) return des;
    return <Fragment>&nbsp;</Fragment>;
  };
  componentWillUnmount() {
    console.log("photocard unmount");
  }
  render() {
    console.log("showPopup=> ", this.state.showPopup);

    const { photo } = this.props;
    const link = `/#/${this.props.homefeeds}/${photo.id}`;
    let card_info = "";
    let card_photo_class = "card-photo";
    let card_img_top_class = "card-img-top";
    let card_img_container_class = "card-img-container";

    if (this.props.homefeeds == "homefeeds") {
      card_photo_class = "card-photo-homefeeds";
      card_img_top_class = "card-img-top-homefeeds";
      card_img_container_class = "card-img-container-homefeeds";
      card_info = (
        <div className="card-body">
          <p className="card-text card-photo-text">
            {this.photoDesciption(photo.description)}
          </p>
          <div className="photocard-user-info">
            <p>
              By {photo.owner.user.username}
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: 20
                }}
              >
                &nbsp; &#183; &nbsp;
              </span>
              {photo.created_at.split("T")[0]}
            </p>
            <Link
              // onClick={() =>
              //   this.props.getHomefeed(
              //     `/api/photo/getUserPhotos?userId=${photo.owner.user.id}`
              //   )
              // }
              to={{
                pathname: `/${photo.owner.user.username}`,
                state: {
                  userID: photo.owner.user.id
                }
              }}
            >
              <img className="user-avatar" src={photo.owner.picture} alt="" />
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className={card_photo_class}>
        <a href={link}>
          <div className={card_img_container_class}>
            <img
              onClick={this.togglePopup}
              src={photo.photo}
              className={card_img_top_class}
              alt="..."
            />
          </div>
        </a>
        {card_info}
        {this.state.showPopup ? (
          <PhotoCardDetailPopup
            text='Click "Close Button" to hide popup'
            closePopup={this.togglePopup}
            homefeeds={this.props.homefeeds}
            photo={photo}
            index={this.props.index}
          />
        ) : null}
      </div>
    );
  }
}
const mapStateToProp = (state, ownProps) => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProp, { getHomefeed })(PhotoCard);
