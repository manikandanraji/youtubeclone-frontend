import {
  GET_CHANNEL_RECOMMENDATIONS,
  SUBSCRIBE_FROM_CHANNEL_RECOMMENDATIONS,
  UNSUBSCRIBE_FROM_CHANNEL_RECOMMENDATIONS,
} from "../actions/types";

const initialState = {
  isFetching: true,
  channels: [],
};

const channelRecommendation = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANNEL_RECOMMENDATIONS:
      return action.payload;
    case SUBSCRIBE_FROM_CHANNEL_RECOMMENDATIONS:
      return {
        ...state,
        channels: state.channels.map((channel) =>
          channel.id === action.payload.id
            ? { ...channel, isSubscribed: !channel.isSubscribed }
            : channel
        ),
      };
    case UNSUBSCRIBE_FROM_CHANNEL_RECOMMENDATIONS:
      return {
        ...state,
        channels: state.channels.map((channel) =>
          channel.id === action.payload
            ? { ...channel, isSubscribed: !channel.isSubscribed }
            : channel
        ),
      };
    default:
      return state;
  }
};

export default channelRecommendation;
