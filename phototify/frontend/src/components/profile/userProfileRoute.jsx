import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import PhotoCardDetail from "./photoCardDetail";
import HomeFeeds from "./homeFeeds";
import ProfileHome from "./profileHome";

class UserProfileRoute extends Component {
  render() {
    return (
      <Fragment>
        {/* <Route exact path="/homefeeds/" component={HomeFeeds} /> */}
        <Route path="/:userID" component={ProfileHome} />
      </Fragment>
    );
  }
}

UserProfileRoute.propTypes = {};

export default UserProfileRoute;
