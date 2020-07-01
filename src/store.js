import { createStore } from "redux";
import youtubeclone from "./reducers";

export default createStore(
	youtubeclone,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
