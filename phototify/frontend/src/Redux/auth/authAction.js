import axios from "axios";
import {
  USER_LOADING,
  USER_LOADING_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  USER_LOGOUT_SUCCESS,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE
} from "./authType";

import { getConfigHeader } from "../../components/common/helper";
export const userLogin = (username, password) => dispatch => {
  dispatch({
    type: USER_LOADING
  });
  const body = JSON.stringify({ username, password });
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  const options = {
    method: "POST",
    headers: config,
    data: body,
    url: "/api/auth/login/"
  };

  axios.post("/api/auth/login/", body, config).then(res => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    const Newconfig = {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${res.data.token}`
      }
    };
    axios.get(`/api/userprofile/${res.data.user.id}/`, Newconfig).then(res => {
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data
      });
    });
  });
};

export const updateUserProfile = userData => (dispatch, getState) => {
  const config = setConfig(getState);
  axios
    .put(`/api/userprofile/${userData.user}/`, userData, config)
    .then(res => {
      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: res.data
      });
    });
};
export const getUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  });

  const config = setConfig(getState);
  console.log(config);

  axios
    .get("/api/auth/user/", config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
      axios.get(`/api/userprofile/${res.data.user.id}/`, config).then(res => {
        dispatch({
          type: GET_USER_PROFILE,
          payload: res.data
        });
      });
    })
    .catch(error => {
      console.log(error.response.data);
      dispatch({
        type: USER_LOADING_FAIL
      });
    });
};

export const userLogout = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  });

  const config = setConfig(getState);

  axios
    .post("/api/auth/logout/", "", config)
    .then(res => {
      dispatch({
        type: USER_LOGOUT_SUCCESS
      });
    })
    .catch(error => {
      console.log(error.response.data);
    });
};

export const setConfig = (getState, type = "default") => {
  const Ctype = type == "default" ? "application/json" : "multipart/form-data";
  const config = {
    headers: {
      "content-type": Ctype
    }
  };
  if (!getState().auth) {
    return config;
  }
  const token = getState().auth.token;
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};
