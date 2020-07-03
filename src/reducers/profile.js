import {
	GET_PROFILE,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	SUBSCRIBE_FROM_PROFILE,
	UNSUBSCRIBE_FROM_PROFILE
} from "../actions/types";

const profile = (state = {}, action) => {
	switch (action.type) {
		case GET_PROFILE:
			return action.payload;
		case CLEAR_PROFILE:
			return {};
		case UPDATE_PROFILE:
			return {
				...state,
				...action.payload
			};
		case SUBSCRIBE_FROM_PROFILE:
			return {
				...state,
				isSubscribed: !state.isSubscribed,
				subscribersCount: state.subscribersCount + 1
			};
		case UNSUBSCRIBE_FROM_PROFILE:
			return {
				...state,
				isSubscribed: !state.isSubscribed,
				subscribersCount: state.subscribersCount - 1
			};
		default:
			return state;
	}
};

export default profile;
