import { SHOW_NOT_FOUND, CLEAR_NOT_FOUND } from "../actions/types";

const notfound = (state = false, action) => {
	switch (action.type) {
		case SHOW_NOT_FOUND:
			return true;
		case CLEAR_NOT_FOUND:
			return false;
		default:
			return state;
	}
};

export default notfound;
