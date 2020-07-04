import { GET_LIKED_VIDEOS } from "../actions/types";

const likedVideo = (state = [], action) => {
	switch (action.type) {
		case GET_LIKED_VIDEOS:
			return action.payload;
		default:
			return state;
	}
};

export default likedVideo;
