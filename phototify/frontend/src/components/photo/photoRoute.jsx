import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

const PhotoRoute = () => {
  return (
    <div>
      <Route exact path="/photo" component={} />
      <Route exact path="/photo/:photoID" component={} />
    </div>
  );
};

PhotoRoute.propTypes = {};

export default PhotoRoute;
