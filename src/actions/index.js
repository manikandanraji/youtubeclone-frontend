import { toast } from "react-toastify";
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
	GET_SEARCH_RESULTS,
	GET_TRENDING,
	ADD_CHANNEL,
	REMOVE_CHANNEL,
	GET_LIKED_VIDEOS,
	UPDATE_USER,
	ADD_TO_LIKED_VIDEOS,
	REMOVE_FROM_LIKED_VIDEOS,
	ADD_TO_RECOMMENDATIONS
} from "./types";

import api from "../services/api";
import {
	addChannelLocalSt,
	removeChannelLocalSt,
	authenticate
} from "../utils";

export const signupUser = (payload, clearForm) => async dispatch => {
	const user = await authenticate("signup", payload);

	if (user) {
		clearForm();
		dispatch({ type: SIGNUP, payload: user });
		toast.dark("Signup successful");
	}
};

export const loginUser = payload => async dispatch => {
	const user = await authenticate("login", payload);

	if (user) {
		dispatch({ type: LOGIN, payload: user });
		toast.dark("Login successful");
	}
};

export const logoutUser = () => dispatch => {
	localStorage.removeItem("user");

	dispatch({
		type: LOGOUT
	});

	toast.dark("You are logged out");
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

export const getTrending = () => async dispatch => {
	try {
		const res = await api.get("videos");

		const videos = res.data.data;
		videos.sort((a, b) => b.views - a.views);

		dispatch({
			type: GET_TRENDING,
			payload: videos
		});
	} catch (err) {
		console.error(err.response);
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
		const res = await api.get(`users/${userId}`);

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
		dispatch({
			type: UPDATE_PROFILE,
			payload: data
		});

		await api.put("users", data);
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

export const subscribeFromVideo = channel => async dispatch => {
	dispatch({
		type: SUBSCRIBE_FROM_VIDEO
	});

	addChannelLocalSt(channel);

	dispatch({
		type: ADD_CHANNEL,
		payload: channel
	});

	await api.get(`users/${channel.id}/togglesubscribe`);
};

export const unsubscribeFromVideo = userId => async dispatch => {
	dispatch({
		type: UNSUBSCRIBE_FROM_VIDEO
	});

	removeChannelLocalSt(userId);

	dispatch({
		type: REMOVE_CHANNEL,
		payload: userId
	});

	await api.get(`users/${userId}/togglesubscribe`);
};

export const subscribeFromProfile = channel => async dispatch => {
	dispatch({
		type: SUBSCRIBE_FROM_PROFILE
	});

	addChannelLocalSt(channel);

	dispatch({
		type: ADD_CHANNEL,
		payload: channel
	});

	await api.get(`users/${channel.id}/togglesubscribe`);
};

export const unsubscribeFromProfile = userId => async dispatch => {
	dispatch({
		type: UNSUBSCRIBE_FROM_PROFILE
	});

	removeChannelLocalSt(userId);

	dispatch({
		type: REMOVE_CHANNEL,
		payload: userId
	});

	await api.get(`users/${userId}/togglesubscribe`);
};

export const likeVideo = video => async dispatch => {
	dispatch({
		type: LIKE
	});

	dispatch({
		type: ADD_TO_LIKED_VIDEOS,
		payload: video
	});

	await api.get(`videos/${video.id}/like`);
};

export const cancelLike = videoId => async dispatch => {
	dispatch({
		type: CANCEL_LIKE
	});

	dispatch({
		type: REMOVE_FROM_LIKED_VIDEOS,
		payload: videoId
	});

	await api.get(`videos/${videoId}/like`);
};

export const dislikeVideo = videoId => async dispatch => {
	dispatch({
		type: DISLIKE
	});

	await api.get(`videos/${videoId}/dislike`);
};

export const cancelDislike = videoId => async dispatch => {
	dispatch({
		type: CANCEL_DISLIKE
	});

	await api.get(`videos/${videoId}/dislike`);
};

export const getLikedVideos = () => async dispatch => {
	try {
		const res = await api.get("users/likedVideos");

		dispatch({
			type: GET_LIKED_VIDEOS,
			payload: res.data.data
		});
	} catch (err) {
		console.error(err.response.data);
	}
};

export const updateUser = data => async dispatch => {
	const user = JSON.parse(localStorage.getItem("user"));

	const updatedUser = { ...user, ...data };

	localStorage.setItem("user", JSON.stringify(updatedUser));

	dispatch({
		type: UPDATE_USER,
		payload: data
	});
};

export const uploadVideo = video => async dispatch => {
	try {
		const res = await api.post("videos", video);

		const { id, avatar, username } = JSON.parse(localStorage.getItem("user"));

		const newVideo = res.data.data;
		newVideo.views = 0;
		newVideo.User = { id, avatar, username };

		dispatch({ type: ADD_TO_RECOMMENDATIONS, payload: newVideo });
	} catch (err) {
		console.error(err.response.data);
	}
};

export const openSidebar = () => ({ type: OPEN_SIDEBAR });
export const closeSidebar = () => ({ type: CLOSE_SIDEBAR });
