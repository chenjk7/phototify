import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ProfileUserInfo extends Component {
  constructor(props) {
    super(props);
    // this.state();
  }

  render() {
    // const { user } = this.props.auth.user;
    const { user } = this.props;
    console.log("user -> ", user);
    if (user) {
      return (
        <div>
          <img className="userpofile-avatar" src={user.picture} alt="" />
          <h2>{user.user.username}</h2>
          <ul className="userpofile-info-detaillist">
            <li>
              {" "}
              <span>{user.follower_count}</span>
              {" Followers"}
            </li>
            <li>
              {" "}
              <span>{user.following_count}</span>
              {" Followings"}
            </li>
            <li>
              {" "}
              <i className="fas fa-map-marker-alt"></i>{" "}
              <span>{user.location ? user.location : "Unknown"}</span>
            </li>
          </ul>
        </div>
      );
    } else {
      return "";
    }
  }
}

ProfileUserInfo.propTypes = {};

// const mapStateToProp = (state, ownProps) => {
//   return {
//     ...state,
//     user: state.auth.userprofile
//   };
// };
export default ProfileUserInfo;
