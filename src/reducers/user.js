import { LOGIN, SIGNUP, LOGOUT } from "../actions/types";

const user = (state = {}, action) => {
	switch (action.type) {
		case SIGNUP:
			return {
				token: "dummytoken",
				...action.payload
			};
		case LOGIN:
			return {
				token: "dummytoken",
				...action.payload
			};
		case LOGOUT:
			return action.payload;
		default:
			return state;
	}
};

export default user;
