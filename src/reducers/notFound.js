import { createSlice } from "@reduxjs/toolkit";

const notFoundSlice = createSlice({
  name: "notFound",
  initialState: {
    notFound: false,
  },
  reducers: {
    showNotFound(state, action) {
      state.notFound = true;
    },
    clearNotFound(state, action) {
      state.notFound = false;
    },
  },
});

export const { showNotFound, clearNotFound } = notFoundSlice.actions;

export default notFoundSlice.reducer;
