import {
  LOGIN_SUCCESS,
  USER_LOADED,
  USER_LOGOUT_SUCCESS,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  USER_LOADING_FAIL
} from "./authType";

const initState = {
  loading: false,
  isAuthenticated: null,
  token: localStorage.getItem("token"),
  user: null,
  userprofile: null,
  error: null
};
const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        userprofile: action.payload
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userprofile: action.payload
      };
    case USER_LOADING_FAIL:
      return {
        ...state,
        isAuthenticated: false
      };
    case USER_LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        userprofile: null,
        error: null
      };
    default:
      return state;
  }
};

export default AuthReducer;
