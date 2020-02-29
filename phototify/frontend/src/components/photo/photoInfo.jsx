import React, { Component } from "react";
import PropTypes from "prop-types";
import { getDate } from "../common/helper";
import { connect } from "react-redux";
import { updateUserProfile } from "../../Redux/auth/authAction";

class PhotoInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { followText: "Follow" };
  }
  componentDidMount() {
    const { id } = this.props.photo;
    const { user } = this.props;
    if (user.follow.includes(id)) {
      this.setState({ followText: "Following" });
    } else {
      this.setState({ followText: "Follow" });
    }
  }
  onFollowBtnHover = () => {
    if (this.state.followText == "Following") {
      this.setState({ followText: "Unfollow" });
    }
  };
  onFollowBtnMouseLeave = () => {
    const { id } = this.props.photo;
    const { user } = this.props;
    if (user.follow.includes(id)) {
      this.setState({ followText: "Following" });
    } else {
      this.setState({ followText: "Follow" });
    }
  };
  onFollowBtnClick = id => {
    const { user } = this.props;
    const userData = {
      user: this.props.user.user.id,
      follow: id
    };
    this.props.updateUserProfile(userData);
  };
  render() {
    const { id, owner, name, description, created_at } = this.props.photo;
    const { homefeeds } = this.props;
    const { user } = this.props;

    let FollowSections = "";
    if (homefeeds == user.user.username) {
      FollowSections = `${user.follower_count} follower`;
    } else {
      FollowSections = (
        <button
          onMouseEnter={this.onFollowBtnHover}
          onMouseLeave={this.onFollowBtnMouseLeave}
          onClick={() => this.onFollowBtnClick(id)}
          className="btn btn-light photoinfo-btn-following"
        >
          {this.state.followText}
        </button>
      );
    }
    return (
      <div className="photoinfo-container">
        <h5> {name}</h5>
        <br />
        <p>{description}</p>
        <div className="d-flex flex-row justify-content-between photoinfo-user">
          <p>
            By {owner.user.username}
            <span
              style={{
                fontWeight: "bold",
                fontSize: 20
              }}
            >
              &nbsp; &#183; &nbsp;
            </span>
            {FollowSections}
          </p>
          <img className="user-avatar" src={owner.picture} />
        </div>
        <hr />
        <div className="d-inline-flex">
          <i className="far fa-calendar-alt fa-2x"></i>
          <p className="m-2">{getDate(created_at)}</p>
        </div>
      </div>
    );
  }
}

PhotoInfo.propTypes = {};
const mapStateToProp = (state, ownProps) => {
  return {
    user: state.auth.userprofile
  };
};

export default connect(mapStateToProp, { updateUserProfile })(PhotoInfo);
