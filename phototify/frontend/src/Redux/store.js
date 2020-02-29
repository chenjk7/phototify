import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "./rootReducer";
import thunk from "redux-thunk";
const initState = {};
const middleware = [thunk];

const store = createStore(
  RootReducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
