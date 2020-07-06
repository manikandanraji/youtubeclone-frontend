import axios from "axios";
import api from "../services/api";
import { toast } from "react-toastify";

export const timeSince = timestamp => {
	const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);

	let interval = Math.floor(seconds / 31536000);

	if (interval > 1) {
		return interval + " years";
	}

	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
		return interval + " months";
	}

	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
		return interval + " days";
	}

	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
		return interval + " hours";
	}

	interval = Math.floor(seconds / 60);
	if (interval > 1) {
		return interval + " minutes";
	}

	return Math.floor(seconds) + " seconds";
};

export const upload = async (resourceType, file) => {
	const formData = new FormData();
	formData.append("upload_preset", "youtubeclone");
	formData.append("file", file);

	let toastId = null;
	const config = {
		onUploadProgress: p => {
			const progress = p.loaded / p.total;
			if (toastId === null) {
				toastId = toast("Upload in Progress", {
					progress
				});
			} else {
				toast.update(toastId, {
					progress
				});
			}
		}
	};

	const { data } = await axios.post(
		`${process.env.REACT_APP_CLOUDINARY_ENDPOINT}/${resourceType}/upload`,
		formData,
		config
	);

	toast.dismiss(toastId);

	return data.secure_url;
};

export const authenticate = async (endpoint, data) => {
	const backendUrl = process.env.REACT_APP_BACKEND_URL;

	try {
		const tokenRes = await axios.post(`${backendUrl}auth/${endpoint}`, data);

		const config = {
			headers: { Authorization: `Bearer ${tokenRes.data.data}` }
		};

		const userRes = await axios.get(`${backendUrl}auth/me`, config);

		const user = { ...userRes.data.data, token: tokenRes.data.data };

		api.defaults.headers.common[
			"Authorization"
		] = `Bearer ${tokenRes.data.data}`;

		localStorage.setItem("user", JSON.stringify(user));

		return user;
	} catch (err) {
		toast.dismiss();
		toast.error(err.response.data.message);
	}
};

export const removeChannelLocalSt = channelId => {
	const user = JSON.parse(localStorage.getItem("user"));

	const updated = {
		...user,
		channels: user.channels.filter(channel => channel.id !== channelId)
	};

	localStorage.setItem("user", JSON.stringify(updated));
};

export const addChannelLocalSt = channel => {
	const user = JSON.parse(localStorage.getItem("user"));

	const updated = {
		...user,
		channels: [channel, ...user.channels]
	};

	localStorage.setItem("user", JSON.stringify(updated));
};
