import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getChannelRecommendations } from "../actions";
import ChannelInfo from "./ChannelInfo";
import { StyledTrending } from "../pages/Trending";
import Skeleton from "../skeletons/SuggestionSkeleton";

const Suggestions = ({ isFetching, channels, getChannelRecommendations }) => {
  useEffect(() => {
    getChannelRecommendations();
  }, [getChannelRecommendations]);

  if (isFetching) {
    return <Skeleton />;
  }

  return (
    <StyledTrending>
      <h2>Suggestions For You</h2>
      {channels?.map((channel) => (
        <ChannelInfo key={channel.id} channel={channel} />
      ))}
    </StyledTrending>
  );
};

const mapStateToProps = ({ channelRecommendation }) => ({
  isFetching: channelRecommendation.isFetching,
  channels: channelRecommendation.channels,
});

export default connect(mapStateToProps, { getChannelRecommendations })(
  Suggestions
);
