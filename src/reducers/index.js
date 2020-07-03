import { combineReducers } from "redux";
import user from "./user";
import feed from "./feed";
import video from "./video";
import profile from "./profile";
import sidebar from "./sidebar";
import recommendation from "./recommendation";
import channelRecommendation from "./channelRecommendation";

export default combineReducers({
	user,
	feed,
	video,
	profile,
	sidebar,
	recommendation,
	channelRecommendation
});
