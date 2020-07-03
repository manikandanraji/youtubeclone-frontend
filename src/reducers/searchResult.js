import { GET_SEARCH_RESULTS } from "../actions/types";

const searchResult = (state = {}, action) => {
	switch (action.type) {
		case GET_SEARCH_RESULTS:
			return action.payload;
		default:
			return state;
	}
};

export default searchResult;
