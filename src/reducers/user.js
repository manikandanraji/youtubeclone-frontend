import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticate } from "../utils";

export const login = createAsyncThunk(
  "user/login",
  async ({ payload, clearForm }) => {
    const user = await authenticate("login", payload);

    if (user.token) {
      clearForm();
      return user;
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async ({ payload, clearForm }) => {
    const user = await authenticate("signup", payload);

    if (user.token) {
      clearForm();
      return user;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: JSON.parse(localStorage.getItem("user")) || {},
  },
  reducers: {
    addChannel(state, action) {
      state.data = {
        ...state.data,
        channels: [action.payload, ...state.data.channels],
      };
    },
    removeChannel(state, action) {
      state.data = {
        ...state.data,
        channels: state.data.channels.filter(
          (channel) => channel.id !== action.payload
        ),
      };
    },
    updateUser(state, action) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    logout(state, action) {
      state.data = {};
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.data = action.payload || {};
    },
    [signup.fulfilled]: (state, action) => {
      state.data = action.payload || {};
    },
  },
});

export const {
  addChannel,
  removeChannel,
  updateUser,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
