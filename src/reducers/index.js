import { combineReducers } from "redux";

// reducers
import user from "./user";
import feed from "./feed";
import video from "./video";
import profile from "./profile";
import sidebar from "./sidebar";
import recommendation from "./recommendation";
import channelRecommendation from "./channelRecommendation";
import searchResult from "./searchResult";
import trending from "./trending";
import likedVideo from "./likedVideo";
import history from "./history";

export default combineReducers({
  user,
  feed,
  video,
  profile,
  sidebar,
  recommendation,
  channelRecommendation,
  searchResult,
  trending,
  likedVideo,
  history,
});
