import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ProfileUserInfo from "./profileUserInfo";
import PrivateRoute from "../common/privateRoute";
import HomeFeeds from "../photo/homeFeeds";
import axios from "axios";
import { getConfigHeader } from "../common/helper";
import { getHomefeedUser } from "../../Redux/photo/photoAction";

class ProfileHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userprofile_container_class: "userprofile-container",
      sccrollpos: 0,
      fetchUrl: "",
      userID: "",
      HomeFeedsDIV: "",
      ProfileUserInfoDIV: "",
      searchText: "",
      username: "",
      userData: ""
    };
  }
  // componentDidMount() {
  // console.log("ProfileHome :", this.props.match.params);
  // const { username } = this.props.match.params;
  // if (typeof this.props.location.state !== "undefined") {
  //   const { userID } = this.props.location.state;
  //   // if (userID) console.log("feed userID ->", userID);
  //   this.setState({
  //     fetchUrl: `/api/photo/getUserPhotos?userId=${userID}`,
  //     user: username
  //   });
  // } else if (this.props.user.user.username === username) {
  //   this.setState({
  //     fetchUrl: "/api/photo/",
  //     user: username
  //   });
  // }
  // }
  hideBackground = hidden => {
    if (hidden) {
      this.setState({
        sccrollpos: window.pageYOffset,
        userprofile_container_class: "userprofile-container-hidden"
      });
    } else {
      this.setState(
        {
          userprofile_container_class: "userprofile-container"
        },
        () => {
          window.scrollTo(0, this.state.sccrollpos);
        }
      );
    }
  };
  componentDidUpdate() {
    this.onscrollTo();
  }
  onscrollTo = () => {
    window.scrollTo(0, this.state.sccrollpos);
  };
  callback(input) {
    if (typeof input !== "undefined") {
      this.setState({ userID: input.user.id });
    }
  }
  getUserIDWrapper(username) {
    axios
      .get(
        `/api/auth/getUserByUsername?username=${username}`,
        getConfigHeader()
      )
      .then(res => {
        this.setState({ userID: res.data.user.id });
      });
  }
  async getUserID(username) {
    await this.props.getHomefeedUser(username);
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps ", nextProps.location);

    if (nextProps.location) {
      if (nextProps.location.state == "reload") {
        // location.reload();
      }
    }
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("nextProps nextState ");
    console.log(nextProps.searchText);
    console.log(this.props.searchText);
    if (this.props.searchText !== nextProps.searchText) {
      this.setState({ searchText: nextProps.searchText });
    }
  }
  componentDidMount() {
    const { username } = this.props.match.params;
    this.getUserID(username);
    axios
      .get(
        `/api/auth/getUserByUsername?username=${username}`,
        getConfigHeader()
      )
      .then(res => {
        this.setState({
          // HomeFeedsDIV: (
          //   <HomeFeeds
          //     fetchUrl={`/api/photo/getUserPhotos?userId=${res.data.user.id}`}
          //     homefeeds={res.data.user.username}
          //     hideBackground={this.hideBackground}
          //     key={res.data.user.id}
          //     searchText={this.state.searchText}
          //   />
          // ),
          ProfileUserInfoDIV: <ProfileUserInfo user={res.data} />,
          userData: res.data,
          userID: res.data.user.id,
          username: res.data.user.username
        });
      });
    // if (username == this.props.homeFeedUser.user.id) {
    //   this.setState({
    //     HomeFeedsDIV: (
    //       <HomeFeeds
    //         fetchUrl="/api/photo/"
    //         homefeeds={this.props.userprofile.user.username}
    //         hideBackground={this.hideBackground}
    //       />
    //     )
    //   });
  }
  render() {
    // const { username } = this.props.match.params;
    // const { userprofile } = this.props;
    // let fetchUrl = "",
    //   user = "";
    // if (typeof this.props.location.state !== "undefined") {
    //   const { userID } = this.props.location.state;
    //   // if (userID) console.log("feed userID ->", userID);

    //   fetchUrl = `/api/photo/getUserPhotos?userId=${userID}`;
    //   user = username;
    // } else if (userprofile === username) {
    //   fetchUrl = "/api/photo/";
    //   user = username;
    // } else {
    //   // const otheruserProfile = this.getUserID(username);
    //   console.log("username ", username);

    //   fetchUrl = `/api/photo/getUserPhotos?userId=${this.props.homeFeedUser.user.id}`;
    //   user = username;
    // }
    const { username } = this.props.match.params;

    console.log("userprofile -> ", this.props.userprofile);

    return (
      <div className={this.state.userprofile_container_class}>
        <div className="userpfofile-top">
          <img
            className="userprofile-top-img"
            src={"/static/profile/DSCF2796-5.jpg"}
          />
        </div>
        <div className="userprofile-info-container">
          <ProfileUserInfo user={this.state.userData} />
          {/* {this.state.ProfileUserInfoDIV} */}
        </div>
        {/* {this.state.HomeFeedsDIV}
         */}
        <HomeFeeds
          fetchUrl={`/api/photo/getUserPhotos?userId=${this.state.userID}`}
          homefeeds={this.state.username}
          hideBackground={this.hideBackground}
          key={this.state.userID}
          searchText={this.props.searchText}
        />
      </div>
    );
  }
}

ProfileHome.propTypes = {};
const mapStateToProp = (state, ownProps) => {
  return {
    userprofile: state.auth.userprofile,
    homeFeedUser: state.homeFeedPhotos.homeFeedUser
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getHomefeedUser: username => dispatch(getHomefeedUser(username))
  };
};
export default connect(mapStateToProp, mapDispatchToProps)(ProfileHome);
