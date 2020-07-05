import { GET_HISTORY } from "../actions/types";

const initialState = {
	isFetching: true,
	videos: []
};

const history = (state = initialState, action) => {
	switch (action.type) {
		case GET_HISTORY:
			return action.payload;
		default:
			return state;
	}
};

export default history;
