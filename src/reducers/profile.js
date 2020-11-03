import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (userId, thunk) => {
    const { data } = await client(
      `${process.env.REACT_APP_BE}/users/${userId}`
    );
    return data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isFetching: true,
    data: {},
  },
  reducers: {
    updateProfile(state, action) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    clearProfile(state, action) {
      state.isFetching = true;
      state.data = {};
    },
    subscribeFromProfile(state, action) {
      state.data = {
        ...state.data,
        subscribersCount: state.data.subscribersCount + 1,
        isSubscribed: !state.data.isSubscribed,
      };
    },
    unsubscribeFromProfile(state, action) {
      state.data = {
        ...state.data,
        subscribersCount: state.data.subscribersCount - 1,
        isSubscribed: !state.data.isSubscribed,
      };
    },
  },
  extraReducers: {
    [getProfile.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
    },
  },
});

export const {
  updateProfile,
  clearProfile,
  subscribeFromProfile,
  unsubscribeFromProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
