import { SIGNUP, LOGIN, LOGOUT, GET_FEED } from "./types";
import axios from "axios";

export const signupUser = payload => async dispatch => {
	try {
		const tokenRes = await axios.post(
			"http://localhost:5000/api/v1/auth/signup",
			payload
		);

		const userRes = await axios.get("http://localhost:5000/api/v1/auth/me", {
			headers: { Authorization: tokenRes.data.data }
		});

		localStorage.setItem(
			"user",
			JSON.stringify({ ...userRes.data.data, token: tokenRes.data.data })
		);

		dispatch({
			type: SIGNUP,
			payload: { ...userRes.data.data, token: tokenRes.data.data }
		});
	} catch (err) {
		console.error(err.response.data);
	}
};

export const loginUser = payload => async dispatch => {
	try {
		const tokenRes = await axios.post(
			"http://localhost:5000/api/v1/auth/login",
			payload
		);

		const userRes = await axios.get("http://localhost:5000/api/v1/auth/me", {
			headers: { Authorization: tokenRes.data.data }
		});

		localStorage.setItem(
			"user",
			JSON.stringify({ ...userRes.data.data, token: tokenRes.data.data })
		);

		dispatch({
			type: LOGIN,
			payload: { ...userRes.data.data, token: tokenRes.data.data }
		});
	} catch (err) {
		console.error(err.response.data);
	}
};

export const logoutUser = () => dispatch => {
	localStorage.removeItem('user');

	dispatch({
		type: LOGOUT
	})
}

export const getFeed = () => async dispatch => {
	try {
		const { token } = JSON.parse(localStorage.getItem('user'));

		const res = await axios.get(
			"http://localhost:5000/api/v1/users/feed",
			{ headers: { Authorization: token } }
		);

		dispatch({
			type: GET_FEED,
			payload: res.data.data
		});
	} catch (err) {
		console.error(err.response.data);
	}
};
