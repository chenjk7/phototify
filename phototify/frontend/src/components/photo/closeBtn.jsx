import React from "react";
import { useHistory } from "react-router-dom";
const closeBtn = ({ closePopup }) => {
  let history = useHistory();
  let back = () => {
    history.goBack();
  };

  return (
    <button
      className="popup-close"
      onClick={e => {
        back(), closePopup();
      }}
    >
      <i className="fas fa-times fa-2x"></i>
    </button>
  );
};

export default closeBtn;
