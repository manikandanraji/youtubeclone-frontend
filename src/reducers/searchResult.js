import {
	GET_SEARCH_RESULTS,
	CLEAR_SEARCH_RESULTS,
	SUBSCRIBE_FROM_SEARCH_RESULTS,
	UNSUBSCRIBE_FROM_SEARCH_RESULTS
} from "../actions/types";

const initialState = {
	isFetching: true
};

const searchResult = (state = initialState, action) => {
	switch (action.type) {
		case GET_SEARCH_RESULTS:
			return action.payload;
		case SUBSCRIBE_FROM_SEARCH_RESULTS:
			return {
				...state,
				users: state.users.map(user =>
					user.id === action.payload.id
						? { ...user, isSubscribed: !user.isSubscribed }
						: user
				)
			};
		case UNSUBSCRIBE_FROM_SEARCH_RESULTS:
			return {
				...state,
				users: state.users.map(user =>
					user.id === action.payload
						? { ...user, isSubscribed: !user.isSubscribed }
						: user
				)
			};
		case CLEAR_SEARCH_RESULTS:
			return { isFetching: true };
		default:
			return state;
	}
};

export default searchResult;
