import { GET_TRENDING } from "../actions/types";

const initialState = {
	isFetching: true,
	videos: []
}

const trending = (state = initialState, action) => {
	switch (action.type) {
		case GET_TRENDING:
			return action.payload;
		default:
			return state;
	}
};

export default trending;
