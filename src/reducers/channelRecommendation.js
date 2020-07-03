import { GET_CHANNEL_RECOMMENDATIONS } from "../actions/types";

const channelRecommendation = (state = [], action) => {
	switch (action.type) {
		case GET_CHANNEL_RECOMMENDATIONS:
			return action.payload;
		default:
			return state;
	}
};

export default channelRecommendation;
