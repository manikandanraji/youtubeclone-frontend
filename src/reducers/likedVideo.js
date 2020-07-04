import {
	GET_LIKED_VIDEOS,
	ADD_TO_LIKED_VIDEOS,
	REMOVE_FROM_LIKED_VIDEOS
} from "../actions/types";

const likedVideo = (state = [], action) => {
	switch (action.type) {
		case GET_LIKED_VIDEOS:
			return action.payload;
		case ADD_TO_LIKED_VIDEOS:
			return [action.payload, ...state];
		case REMOVE_FROM_LIKED_VIDEOS:
			return state.filter(video => video.id !== action.payload);
		default:
			return state;
	}
};

export default likedVideo;
