import React, { Component } from "react";
import PropTypes from "prop-types";
// import "./style.css";
import { useHistory } from "react-router-dom";

const PhotoCardDetail = ({ closePopup, photo }) => {
  let history = useHistory();
  let back = () => {
    history.goBack();
  };
  return (
    <div>
      detail
      <p>photo</p>
      <button onClick={back}>click</button>
    </div>
  );
};

PhotoCardDetail.propTypes = {};

export default PhotoCardDetail;
