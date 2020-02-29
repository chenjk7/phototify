import React from "react";
import PropTypes from "prop-types";
import { getDate } from "../common/helper";

const setData = date => {
  date = date.split("-");
  return `${date[1]}-${date[2]}`;
};
const PhotoComment = ({ comment }) => {
  return (
    <div className="PhotoComments-line">
      <img src={comment.user.picture} className="user-avatar" />
      <div className="PhotoComments-line-right">
        <div className="PhotoComments-line-right-top">
          <p>{comment.user.user.username}</p>
          <p>{setData(getDate(comment.date_created))}</p>
        </div>
        <p> {comment.comment}</p>
      </div>
    </div>
  );
};

PhotoComment.propTypes = {};

export default PhotoComment;
