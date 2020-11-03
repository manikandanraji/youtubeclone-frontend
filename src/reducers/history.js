import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getHistory = createAsyncThunk("history/getHistory", async () => {
  const { data } = await client(`${process.env.REACT_APP_BE}/users/history`);
  return data;
});

const historySlice = createSlice({
  name: "history",
  initialState: {
    isFetching: true,
    videos: [],
  },
  extraReducers: {
    [getHistory.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
    },
  },
});

export default historySlice.reducer;
