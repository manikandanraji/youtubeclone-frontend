import { GET_HISTORY, ADD_TO_HISTORY } from "../actions/types";

const initialState = {
	isFetching: true,
	videos: []
};

const history = (state = initialState, action) => {
	switch (action.type) {
		case GET_HISTORY:
			return action.payload;
		case ADD_TO_HISTORY:
			return {
				...state,
				videos: [action.payload, ...state.videos]
			}
		default:
			return state;
	}
};

export default history;
