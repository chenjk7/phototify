import { combineReducers } from "redux";
import AuthReducer from "./auth/authReducer";
import { PhotoReducer } from "./photo/photoReducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
  homeFeedPhotos: PhotoReducer
});

export default RootReducer;
