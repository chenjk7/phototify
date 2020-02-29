import {
  GET_HOMEFEED,
  GET_MORE_HOMEFEED,
  UPLOAD_PHOTO,
  GET_HOMEFEED_USER,
  PHOTO_SEARCHTEXT
} from "./photoType";

const initState = {
  homeFeed: [],
  next: null,
  homeFeedUser: null,
  searchText: ""
};
export const PhotoReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_HOMEFEED:
      return {
        ...state,
        homeFeed: [...action.payload.results],
        next: action.payload.next
      };
    case GET_HOMEFEED_USER:
      return {
        ...state,
        homeFeedUser: action.payload
      };
    case GET_MORE_HOMEFEED:
      return {
        ...state,
        homeFeed: [...state.homeFeed, ...action.payload.results],
        next: action.payload.next
      };
    case UPLOAD_PHOTO:
      return {
        ...state,
        homeFeed: [action.payload, ...state.homeFeed]
      };
    case PHOTO_SEARCHTEXT:
      return {
        ...state,
        searchText: action.payload
      };
    default:
      return state;
  }
};
