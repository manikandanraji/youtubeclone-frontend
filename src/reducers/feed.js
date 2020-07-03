import { GET_FEED } from "../actions/types";

const feed = (state = [], action) => {
	switch (action.type) {
		case GET_FEED:
			return action.payload;
		default:
			return state;
	}
};

export default feed;
