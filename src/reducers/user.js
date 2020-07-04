import {
	LOGIN,
	SIGNUP,
	LOGOUT,
	ADD_CHANNEL,
	REMOVE_CHANNEL,
	UPDATE_USER
} from "../actions/types";

const localSt = JSON.parse(localStorage.getItem("user"));
const initialState = localSt ? localSt : {};

const user = (state = initialState, action) => {
	switch (action.type) {
		case SIGNUP:
			return action.payload;
		case LOGIN:
			return action.payload;
		case ADD_CHANNEL:
			return {
				...state,
				channels: [action.payload, ...state.channels]
			};
		case REMOVE_CHANNEL:
			return {
				...state,
				channels: state.channels.filter(
					channel => channel.id !== action.payload
				)
			};
		case UPDATE_USER:
			return {
				...state,
				...action.payload
			};
		case LOGOUT:
			return {};
		default:
			return state;
	}
};

export default user;
