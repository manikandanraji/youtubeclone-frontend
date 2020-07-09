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
  LIKE,
  DISLIKE,
  CANCEL_LIKE,
  CANCEL_DISLIKE,
  GET_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS,
  GET_TRENDING,
  ADD_CHANNEL,
  REMOVE_CHANNEL,
  GET_LIKED_VIDEOS,
  UPDATE_USER,
  ADD_TO_LIKED_VIDEOS,
  REMOVE_FROM_LIKED_VIDEOS,
  ADD_TO_RECOMMENDATIONS,
  GET_HISTORY,
  SHOW_NOT_FOUND,
  CLEAR_NOT_FOUND,
  ADD_TO_HISTORY,
} from "./types";

import api from "../services/api";
import {
  addChannelLocalSt,
  removeChannelLocalSt,
  authenticate,
} from "../utils";

export const signupUser = (payload, clearForm) => async (dispatch) => {
  const user = await authenticate("signup", payload);

  if (user) {
    clearForm();
    dispatch({ type: SIGNUP, payload: user });
    window.location = "/";
  }
};

export const loginUser = (payload, clearForm) => async (dispatch) => {
  const user = await authenticate("login", payload);

  if (user) {
    clearForm();
    dispatch({ type: LOGIN, payload: user });
    window.location = "/";
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("user");

  dispatch({
    type: LOGOUT,
  });

  window.location = "/";
};

export const getRecommendations = () => async (dispatch) => {
  const res = await api.get("videos");

  dispatch({
    type: GET_RECOMMENDATIONS,
    payload: {
      isFetching: false,
      videos: res.data.data,
    },
  });
};

export const getTrending = () => async (dispatch) => {
  const res = await api.get("videos");

  const videos = res.data.data;
  videos.sort((a, b) => b.views - a.views);

  dispatch({
    type: GET_TRENDING,
    payload: {
      isFetching: false,
      videos,
    },
  });
};

export const getChannelRecommendations = (data) => async (dispatch) => {
  const res = await api.get("users", data);

  dispatch({
    type: GET_CHANNEL_RECOMMENDATIONS,
    payload: {
      isFetching: false,
      channels: res.data.data,
    },
  });
};

export const getFeed = () => async (dispatch) => {
  const res = await api.get("users/feed");

  dispatch({
    type: GET_FEED,
    payload: {
      isFetching: false,
      videos: res.data.data,
    },
  });
};

export const getVideo = (videoId) => async (dispatch) => {
  try {
    const res = await api.get(`videos/${videoId}`);

    dispatch({
      type: GET_VIDEO,
      payload: {
        isFetching: false,
        ...res.data.data,
      },
    });
  } catch (err) {
    dispatch({
      type: SHOW_NOT_FOUND,
    });
  }
};

export const clearVideo = () => ({ type: CLEAR_VIDEO });

export const addComment = ({ videoId, text }) => async (dispatch) => {
  const res = await api.post(`videos/${videoId}/comment`, { text });

  dispatch({
    type: ADD_COMMENT,
    payload: res.data.data,
  });
};

export const getProfile = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`users/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: {
        isFetching: false,
        ...res.data.data,
      },
    });
  } catch (err) {
    if (err.response.status === 404) {
      dispatch({
        type: LOGOUT,
      });
    } else {
      dispatch({
        type: SHOW_NOT_FOUND,
      });
    }
  }
};

export const clearProfile = () => ({ type: CLEAR_PROFILE });

export const updateProfile = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_PROFILE,
    payload: data,
  });

  await api.put("users", data);
};

export const getSearchResults = (searchterm) => async (dispatch) => {
  const userRes = await api.get(`users/search?searchterm=${searchterm}`);
  const videoRes = await api.get(`videos/search?searchterm=${searchterm}`);

  dispatch({
    type: GET_SEARCH_RESULTS,
    payload: {
      isFetching: false,
      users: userRes.data.data,
      videos: videoRes.data.data,
    },
  });
};

export const clearSearchResults = () => ({ type: CLEAR_SEARCH_RESULTS });
export const subscribeChannel = ({ channel, type }) => async (dispatch) => {
  dispatch({
    type,
    payload: channel,
  });

  addChannelLocalSt(channel);

  dispatch({
    type: ADD_CHANNEL,
    payload: channel,
  });

  await api.get(`users/${channel.id}/togglesubscribe`);
};

export const unsubscribeChannel = ({ channelId, type }) => async (dispatch) => {
  dispatch({
    type,
    payload: channelId,
  });

  removeChannelLocalSt(channelId);

  dispatch({
    type: REMOVE_CHANNEL,
    payload: channelId,
  });

  await api.get(`users/${channelId}/togglesubscribe`);
};

export const likeVideo = (video) => async (dispatch) => {
  dispatch({
    type: LIKE,
  });

  dispatch({
    type: ADD_TO_LIKED_VIDEOS,
    payload: video,
  });

  await api.get(`videos/${video.id}/like`);
};

export const cancelLike = (videoId) => async (dispatch) => {
  dispatch({
    type: CANCEL_LIKE,
  });

  dispatch({
    type: REMOVE_FROM_LIKED_VIDEOS,
    payload: videoId,
  });

  await api.get(`videos/${videoId}/like`);
};

export const dislikeVideo = (videoId) => async (dispatch) => {
  dispatch({
    type: DISLIKE,
  });

  await api.get(`videos/${videoId}/dislike`);
};

export const cancelDislike = (videoId) => async (dispatch) => {
  dispatch({
    type: CANCEL_DISLIKE,
  });

  await api.get(`videos/${videoId}/dislike`);
};

export const getLikedVideos = () => async (dispatch) => {
  const res = await api.get("users/likedVideos");

  dispatch({
    type: GET_LIKED_VIDEOS,
    payload: {
      isFetching: false,
      videos: res.data.data,
    },
  });
};

export const updateUser = (data) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const updatedUser = { ...user, ...data };

  localStorage.setItem("user", JSON.stringify(updatedUser));

  dispatch({
    type: UPDATE_USER,
    payload: data,
  });
};

export const uploadVideo = (video) => async (dispatch) => {
  const res = await api.post("videos", video);

  const { id, avatar, username } = JSON.parse(localStorage.getItem("user"));

  const newVideo = res.data.data;
  newVideo.views = 0;
  newVideo.User = { id, avatar, username };

  dispatch({ type: ADD_TO_RECOMMENDATIONS, payload: newVideo });
};

export const getHistory = () => async (dispatch) => {
  const res = await api.get("users/history");

  dispatch({
    type: GET_HISTORY,
    payload: {
      isFetching: false,
      videos: res.data.data,
    },
  });
};

export const addToHistory = (video) => async (dispatch) => {
  dispatch({
    type: ADD_TO_HISTORY,
    payload: video,
  });

  await api.get(`videos/${video.id}/view`);
};

export const clearNotFound = () => ({ type: CLEAR_NOT_FOUND });
export const openSidebar = () => ({ type: OPEN_SIDEBAR });
export const closeSidebar = () => ({ type: CLOSE_SIDEBAR });
