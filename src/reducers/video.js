import {
	GET_VIDEO,
	CLEAR_VIDEO,
	ADD_COMMENT,
	SUBSCRIBE_FROM_VIDEO,
	UNSUBSCRIBE_FROM_VIDEO,
	LIKE,
	DISLIKE,
	CANCEL_LIKE,
	CANCEL_DISLIKE
} from "../actions/types";

const video = (state = {}, action) => {
	switch (action.type) {
		case GET_VIDEO:
			return action.payload;
		case CLEAR_VIDEO:
			return {};
		case ADD_COMMENT:
			return {
				...state,
				comments: [action.payload, ...state.comments]
			};
		case SUBSCRIBE_FROM_VIDEO:
			return {
				...state,
				isSubscribed: !state.isSubscribed
			};
		case UNSUBSCRIBE_FROM_VIDEO:
			return {
				...state,
				isSubscribed: !state.isSubscribed
			};
		case LIKE:
			return {
				...state,
				isLiked: !state.isLiked,
				likesCount: state.likesCount + 1,
			};
		case DISLIKE:
			return {
				...state,
				isDisliked: !state.isDisliked,
				dislikesCount: state.dislikesCount + 1
			};
		case CANCEL_LIKE:
			return {
				...state,
				isLiked: !state.isLiked,
				likesCount: state.likesCount - 1,
			};
		case CANCEL_DISLIKE:
			return {
				...state,
				isDisliked: !state.isDisliked,
				dislikesCount: state.dislikesCount - 1
			};
		default:
			return state;
	}
};

export default video;
