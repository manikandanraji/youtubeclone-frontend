import { GET_RECOMMENDATIONS, ADD_TO_RECOMMENDATIONS } from "../actions/types";

const recommendation = (state = [], action) => {
	switch (action.type) {
		case GET_RECOMMENDATIONS:
			return action.payload;
		case ADD_TO_RECOMMENDATIONS:
			return [action.payload, ...state];
		default:
			return state;
	}
};

export default recommendation;
