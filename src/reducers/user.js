import { LOGIN, SIGNUP, LOGOUT } from "../actions/types";

const localSt = JSON.parse(localStorage.getItem("user"));
const initialState = localSt ? localSt : {};

const user = (state = initialState, action) => {
	switch (action.type) {
		case SIGNUP:
			return action.payload;
		case LOGIN:
			return action.payload;
		case LOGOUT:
			return {};
		default:
			return state;
	}
};

export default user;
