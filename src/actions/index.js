import { SIGNUP, LOGIN, LOGOUT } from "./types";

export const signupUser = payload => ({ type: SIGNUP, payload });

export const loginUser = payload => ({ type: LOGIN, payload });

export const logoutUser = () => ({ type: LOGOUT, payload: null });
