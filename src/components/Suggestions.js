import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChannelInfo from "./ChannelInfo";
import { StyledTrending } from "../pages/Trending";
import Skeleton from "../skeletons/SuggestionSkeleton";
import { getChannels } from "../reducers/channelRecommendation";

const Suggestions = () => {
  const dispatch = useDispatch();
  const { isFetching, channels } = useSelector(
    (state) => state.channelRecommendation
  );

  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);

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

export default Suggestions;
