import {
	SIGNUP,
	LOGIN,
	LOGOUT,
	GET_FEED,
	GET_VIDEO,
	CLEAR_VIDEO,
	ADD_COMMENT,
	GET_PROFILE,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	OPEN_SIDEBAR,
	CLOSE_SIDEBAR,
	GET_RECOMMENDATIONS,
	GET_CHANNEL_RECOMMENDATIONS,
	SUBSCRIBE_FROM_VIDEO,
	UNSUBSCRIBE_FROM_VIDEO,
	LIKE,
	DISLIKE,
	CANCEL_LIKE,
	CANCEL_DISLIKE,
	SUBSCRIBE_FROM_PROFILE,
	UNSUBSCRIBE_FROM_PROFILE,
	GET_SEARCH_RESULTS
} from "./types";

import api from "../services/api";
import { authenticate } from "../utils";

export const signupUser = payload => async dispatch => {
	const user = await authenticate("signup", payload);

	if (user) {
		dispatch({ type: SIGNUP, payload: user });
	}
};

export const loginUser = payload => async dispatch => {
	const user = await authenticate("login", payload);

	if (user) {
		dispatch({ type: LOGIN, payload: user });
	}
};

export const logoutUser = () => dispatch => {
	localStorage.removeItem("user");

	dispatch({
		type: LOGOUT
	});
};

export const getRecommendations = () => async dispatch => {
	try {
		const res = await api.get("videos");

		dispatch({
			type: GET_RECOMMENDATIONS,
			payload: res.data.data
		});
	} catch (err) {
		console.error(err.response.data);
	}
};

export const getChannelRecommendations = data => async dispatch => {
	try {
		const res = await api.get("users", data);

		dispatch({
			type: GET_CHANNEL_RECOMMENDATIONS,
			payload: res.data.data
		});
	} catch (err) {
		console.error(err.response.data);
	}
};

export const getFeed = () => async dispatch => {
	try {
		const res = await api.get("users/feed");

		dispatch({
			type: GET_FEED,
			payload: res.data.data
		});
	} catch (err) {
		console.error(err.response.data);
	}
};

export const getVideo = videoId => async dispatch => {
	try {
		const res = await api.get(`videos/${videoId}`);

		dispatch({
			type: GET_VIDEO,
			payload: res.data.data
		});
	} catch (err) {
		console.error(err.response.data);
	}
};

export const clearVideo = () => ({ type: CLEAR_VIDEO });

export const addComment = ({ videoId, text }) => async dispatch => {
	try {
		const res = await api.post(`videos/${videoId}/comment`, { text });

		dispatch({
			type: ADD_COMMENT,
			payload: res.data.data
		});
	} catch (err) {
		console.error(err.response.data);
	}
};

export const getProfile = userId => async dispatch => {
	try {
		console.log("i");
		const res = await api.get(`users/${userId}`);
		console.log(res);

		dispatch({
			type: GET_PROFILE,
			payload: res.data.data
		});
	} catch (err) {
		console.error(err);
	}
};

export const clearProfile = () => ({ type: CLEAR_PROFILE });

export const updateProfile = data => async dispatch => {
	try {
		console.log(data);

		dispatch({
			type: UPDATE_PROFILE,
			payload: data
		});

		const res = await api.put("users", data);
		console.log(res);
	} catch (err) {
		console.error(err.response.data);
	}
};

export const getSearchResults = searchterm => async dispatch => {
	try {
		let payload = {};

		const userRes = await api.get(`users/search?searchterm=${searchterm}`);

		payload.users = userRes.data.data;

		const videoRes = await api.get(`videos/search?searchterm=${searchterm}`);

		payload.videos = videoRes.data.data;

		dispatch({
			type: GET_SEARCH_RESULTS,
			payload
		});
	} catch (err) {
		console.error(err.response);
	}
};

// TODO
export const subscribeFromVideo = () => ({ type: SUBSCRIBE_FROM_VIDEO });
export const unsubscribeFromVideo = () => ({ type: UNSUBSCRIBE_FROM_VIDEO });

export const subscribeFromProfile = () => ({ type: SUBSCRIBE_FROM_PROFILE });
export const unsubscribeFromProfile = () => ({
	type: UNSUBSCRIBE_FROM_PROFILE
});

// TODO
export const likeVideo = () => ({ type: LIKE });
export const cancelLike = () => ({ type: CANCEL_LIKE });
export const dislikeVideo = () => ({ type: DISLIKE });
export const cancelDislike = () => ({ type: CANCEL_DISLIKE });

export const openSidebar = () => ({ type: OPEN_SIDEBAR });
export const closeSidebar = () => ({ type: CLOSE_SIDEBAR });
