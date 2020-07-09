import { GET_FEED } from "../actions/types";

const initialState = {
  isFetching: true,
  videos: [],
};

const feed = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED:
      return action.payload;
    default:
      return state;
  }
};

export default feed;
