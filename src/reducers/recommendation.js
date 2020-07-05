import { GET_RECOMMENDATIONS, ADD_TO_RECOMMENDATIONS } from "../actions/types";

const initialState = {
	isFetching: true,
	videos: []
};

const recommendation = (state = initialState, action) => {
	switch (action.type) {
		case GET_RECOMMENDATIONS:
			return action.payload;
		case ADD_TO_RECOMMENDATIONS:
			return {
				...state,
				videos: [action.payload, ...state.videos]
			};
		default:
			return state;
	}
};

export default recommendation;
