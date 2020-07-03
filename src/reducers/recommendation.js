import { GET_RECOMMENDATIONS } from "../actions/types";

const recommendation = (state = [], action) => {
	switch (action.type) {
		case GET_RECOMMENDATIONS:
			return action.payload;
		default:
			return state;
	}
};

export default recommendation;
