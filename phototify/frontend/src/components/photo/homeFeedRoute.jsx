import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import PhotoCardDetail from "./photoCardDetail";
import HomeFeeds from "./homeFeeds";

class HomeFeedRoute extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/homefeeds/" component={HomeFeeds} />
        <Route path="/homefeeds/:photoID" component={PhotoCardDetail} />
      </Fragment>
    );
  }
}

HomeFeedRoute.propTypes = {};

export default HomeFeedRoute;
