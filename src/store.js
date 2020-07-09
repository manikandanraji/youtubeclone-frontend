import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import youtubeclone from "./reducers";

export default createStore(
  youtubeclone,
  composeWithDevTools(applyMiddleware(thunk))
);
