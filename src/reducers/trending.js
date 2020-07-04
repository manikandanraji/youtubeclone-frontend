import { GET_TRENDING } from "../actions/types";

const trending = (state = [], action) => {
	switch (action.type) {
		case GET_TRENDING:
			return action.payload;
		default:
			return state;
	}
};

export default trending;
